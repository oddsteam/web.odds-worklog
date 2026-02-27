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

Given("I am on the login page", async function () {
  await loginPage.goto();
  await loginPage.waitForReady();
});

When("I enter valid username and password", async function () {
  await loginPage.clickLoginWithKeycloak();
  await keycloakLoginPage.waitForReady();
  await keycloakLoginPage.fillUsername("e2e");
  await keycloakLoginPage.fillPassword("s3cr3t");
});

When("I click the login button", async function () {
  await keycloakLoginPage.clickLogin();
  await dashboardPage.waitForRedirect();
});

Then("I should be logged in successfully", async function () {
  const url = dashboardPage.getUrl();
  assert.ok(!url.includes("/login"), `Expected URL to not include /login, got ${url}`);

  const token = await dashboardPage.getSessionToken();
  assert.ok(token, "Expected sessionStorage to contain a token");
});

Then("I should be able to register", async function () {
  const url = dashboardPage.getUrl();
  assert.ok(
    url.includes("/firstlogin"),
    `Expected to be on /firstlogin, but got ${url}`
  );
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

Given("I am logged in and on the registration page", { timeout: 60000 }, async function () {
  await loginAndGoToRegistration();
  const url = registrationPage.getUrl();
  assert.ok(url.includes("/firstlogin"), `Expected to be on /firstlogin, but got ${url}`);
});

When("I fill in first name {string} and last name {string}", async function (firstName: string, lastName: string) {
  await registrationPage.fillFirstName(firstName);
  await registrationPage.fillLastName(lastName);
});

When("I fill in bank account name {string}", async function (bankAccountName: string) {
  await registrationPage.fillBankAccountName(bankAccountName);
});

When("I select bank {string}", async function (bankCode: string) {
  await registrationPage.selectBank(bankCode);
});

When("I fill in bank account number {string}", async function (accountNumber: string) {
  await registrationPage.fillBankAccountNumber(accountNumber);
});

When("I fill in phone {string}", async function (phone: string) {
  await registrationPage.fillPhone(phone);
});

When("I fill in slack account {string}", async function (slackAccount: string) {
  await registrationPage.fillSlackAccount(slackAccount);
});

When("I select user type {string}", async function (role: string) {
  await registrationPage.selectUserType(role);
});

When("I select a site", async function () {
  await registrationPage.selectSite();
});

When("I upload the ID card PDF", async function () {
  const fixturePath = path.join(__dirname, "../fixtures/test-idcard.pdf");
  await registrationPage.uploadIdCard(fixturePath);
});

When("I click the save button", { timeout: 30000 }, async function () {
  await registrationPage.clickSave();
});

Then("I should be on the individual dashboard", async function () {
  const url = dashboardPage.getUrl();
  assert.ok(url.includes("/individual"), `Expected to be on /individual, but got ${url}`);
  registrationUserId = await dashboardPage.getUserId();
});
