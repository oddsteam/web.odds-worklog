import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import assert from "assert";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import { Browser, Page, chromium } from "@playwright/test";

const APP_URL = "http://localhost:4200";
const MONGO_URL = "mongodb://admin:admin@127.0.0.1:27017/odds_worklog_db?authSource=admin";

let browser: Browser;
let page: Page;
let registrationUserId: string | null = null;

Before(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  page = await browser.newPage();
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
  await page.goto(`${APP_URL}/login`);
  await page.getByText("Login with Keycloak").waitFor({ state: "visible" });
});

When("I enter valid username and password", async function () {
  await page.getByText("Login with Keycloak").click();
  await page.waitForURL(/localhost:9000/);
  await page.locator("#username").fill("e2e");
  await page.locator("#password").fill("s3cr3t");
});

When("I click the login button", async function () {
  await page.locator("#kc-login").click();
  await page.waitForURL(
    (url) => url.origin === APP_URL && !url.pathname.includes("/login"),
    { timeout: 15000 }
  );
});

Then("I should be logged in successfully", async function () {
  const url = page.url();
  assert.ok(!url.includes("/login"), `Expected URL to not include /login, got ${url}`);

  const token = await page.evaluate(() => sessionStorage.getItem("token"));
  assert.ok(token, "Expected sessionStorage to contain a token");
});

Then("I should be able to register", async function () {
  const url = page.url();
  assert.ok(
    url.includes("/firstlogin"),
    `Expected to be on /firstlogin, but got ${url}`
  );
});

async function performKeycloakLogin(page: Page) {
  await page.getByText("Login with Keycloak").click();
  try {
    await page.waitForURL(/localhost:9000/, { timeout: 5000 });
    await page.locator("#username").fill("e2e");
    await page.locator("#password").fill("s3cr3t");
    await page.locator("#kc-login").click();
  } catch {
    // Keycloak SSO session active — already redirected back to app
  }
  await page.waitForURL(
    (url) => url.origin === APP_URL && !url.pathname.includes("/login"),
    { timeout: 15000 }
  );
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

async function loginAndGoToRegistration(page: Page) {
  await page.goto(`${APP_URL}/login`);
  await page.getByText("Login with Keycloak").waitFor({ state: "visible" });
  await performKeycloakLogin(page);

  if (!page.url().includes("/firstlogin")) {
    // User already registered — clear firstName/lastName directly in MongoDB,
    // then clear sessionStorage so the Angular app re-triggers authentication.
    // Keycloak SSO auto-authenticates; since firstName is now empty the backend
    // returns firstLogin:"Y" and redirects to /firstlogin.
    const userId = await page.evaluate(() => sessionStorage.getItem("idUser"));
    await clearUserRegistration(userId!);
    await page.evaluate(() => sessionStorage.clear());
    await page.goto(`${APP_URL}/login`);
    await page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/firstlogin"),
      { timeout: 15000 }
    );
  }
}

Given("I am logged in and on the registration page", { timeout: 60000 }, async function () {
  await loginAndGoToRegistration(page);
  const url = page.url();
  assert.ok(url.includes("/firstlogin"), `Expected to be on /firstlogin, but got ${url}`);
});

When("I fill in first name {string} and last name {string}", async function (firstName: string, lastName: string) {
  await page.locator("#FirstName").fill(firstName);
  await page.locator("#LastName").fill(lastName);
});

When("I fill in bank account name {string}", async function (bankAccountName: string) {
  await page.locator("#bankAccountName").fill(bankAccountName);
});

When("I select bank {string}", async function (bankCode: string) {
  await page.locator("#bankCode").selectOption(bankCode);
});

When("I fill in bank account number {string}", async function (accountNumber: string) {
  await page.locator("#bankAccountNumber").fill(accountNumber);
});

When("I fill in phone {string}", async function (phone: string) {
  await page.locator("#phone").fill(phone);
});

When("I fill in slack account {string}", async function (slackAccount: string) {
  await page.locator("#slackAccount").fill(slackAccount);
});

When("I select user type {string}", async function (role: string) {
  await page.locator("#role").selectOption(role);
});

When("I select a site", async function () {
  const siteSelect = page.locator("#siteId");
  const options = await siteSelect.locator("option").all();
  for (const option of options) {
    const value = await option.getAttribute("value");
    if (value && value !== "") {
      await siteSelect.selectOption(value);
      break;
    }
  }
});

When("I upload the ID card PDF", async function () {
  const fixturePath = path.join(__dirname, "../fixtures/test-idcard.pdf");
  await page.locator('input[type="file"]').setInputFiles(fixturePath);
});

When("I click the save button", { timeout: 30000 }, async function () {
  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForURL(
    (url) => url.origin === APP_URL && !url.pathname.includes("/firstlogin"),
    { timeout: 15000 }
  );
});

Then("I should be on the individual dashboard", async function () {
  const url = page.url();
  assert.ok(url.includes("/individual"), `Expected to be on /individual, but got ${url}`);
  registrationUserId = await page.evaluate(() => sessionStorage.getItem("idUser"));
});
