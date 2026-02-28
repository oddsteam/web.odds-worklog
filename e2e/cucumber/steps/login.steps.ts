import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import assert from "assert";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import { Browser, chromium } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { KeycloakLoginPage } from "../pages/keycloak-login.page";
import { RegistrationPage } from "../pages/registration.page";
import { DashboardPage } from "../pages/dashboard.page";

const APP_URL = "http://localhost:4200";
const MONGO_URL = "mongodb://admin:admin@127.0.0.1:27017/odds_worklog_db?authSource=admin";

let browser: Browser;
let loginPage: LoginPage;
let keycloakLoginPage: KeycloakLoginPage;
let registrationPage: RegistrationPage;
let dashboardPage: DashboardPage;
let registrationUserId: string | null = null;

Before(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  const page = await browser.newPage();
  page.on("dialog", async (dialog) => await dialog.dismiss());
  loginPage = new LoginPage(page);
  keycloakLoginPage = new KeycloakLoginPage(page);
  registrationPage = new RegistrationPage(page);
  dashboardPage = new DashboardPage(page);
});

After(async function () {
  await browser?.close();
});

After({ tags: "@registration" }, async function () {
  if (registrationUserId) {
    await clearUserRegistration(registrationUserId);
    registrationUserId = null;
  }
});

Given("I am a new user", async function () {
  await loginPage.goto();
  await loginPage.waitForReady();
});

When("I log in with valid credentials", async function () {
  await loginPage.clickLoginWithKeycloak();
  await keycloakLoginPage.waitForReady();
  await keycloakLoginPage.fillUsername("e2e");
  await keycloakLoginPage.fillPassword("s3cr3t");
  await keycloakLoginPage.clickLogin();
  await dashboardPage.waitForRedirect();
});

Then("I should be directed to complete my registration", async function () {
  const url = dashboardPage.getUrl();
  assert.ok(url.includes("/firstlogin"), `Expected to be on /firstlogin, but got ${url}`);
});

async function performKeycloakLogin() {
  await loginPage.clickLoginWithKeycloak();
  try {
    await keycloakLoginPage.waitForReady(5000);
    await keycloakLoginPage.fillUsername("e2e");
    await keycloakLoginPage.fillPassword("s3cr3t");
    await keycloakLoginPage.clickLogin();
  } catch {
    // Keycloak SSO session active — already redirected back to app
  }
  await dashboardPage.waitForRedirect();
}

async function clearUserRegistration(userId: string) {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db("odds_worklog_db");
    await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { firstName: "", lastName: "" } }
    );
  } finally {
    await client.close();
  }
}

async function loginAndGoToRegistration() {
  await loginPage.goto();
  await loginPage.waitForReady();
  await performKeycloakLogin();

  if (!registrationPage.getUrl().includes("/firstlogin")) {
    // User already registered — clear firstName/lastName directly in MongoDB,
    // then clear sessionStorage so the Angular app re-triggers authentication.
    // Keycloak SSO auto-authenticates; since firstName is now empty the backend
    // returns firstLogin:"Y" and redirects to /firstlogin.
    const userId = await dashboardPage.getUserId();
    await clearUserRegistration(userId!);
    await dashboardPage.clearSessionStorage();
    await loginPage.goto();
    await dashboardPage.waitForRedirectToFirstLogin();
  }
}

Given("I am logged in for the first time", { timeout: 60000 }, async function () {
  await loginAndGoToRegistration();
  const url = registrationPage.getUrl();
  assert.ok(url.includes("/firstlogin"), `Expected to be on /firstlogin, but got ${url}`);
});

When("I complete my individual registration", { timeout: 30000 }, async function () {
  await registrationPage.fillFirstName("E2E");
  await registrationPage.fillLastName("Test");
  await registrationPage.fillBankAccountName("ทดสอบ อี ทู อี");
  await registrationPage.selectBank("ttb");
  await registrationPage.fillBankAccountNumber("1234567890");
  await registrationPage.fillPhone("0812345678");
  await registrationPage.fillSlackAccount("e2etest@oddsteam.com");
  await registrationPage.selectUserType("individual");
  await registrationPage.selectSite();
  await registrationPage.uploadIdCard(path.join(__dirname, "../fixtures/test-idcard.pdf"));
  await registrationPage.clickSave();
});

Then("I should be on the individual dashboard", async function () {
  const url = dashboardPage.getUrl();
  assert.ok(url.includes("/individual"), `Expected to be on /individual, but got ${url}`);
  registrationUserId = await dashboardPage.getUserId();
});
