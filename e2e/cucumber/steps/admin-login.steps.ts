import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import assert from "assert";
import { MongoClient, ObjectId } from "mongodb";
import { Browser, BrowserContext, Download, Page, chromium } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { KeycloakLoginPage } from "../pages/keycloak-login.page";
import { DashboardPage } from "../pages/dashboard.page";

const MONGO_URL = "mongodb://admin:admin@127.0.0.1:27017/odds_worklog_db?authSource=admin";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let keycloakLoginPage: KeycloakLoginPage;
let dashboardPage: DashboardPage;
let adminUserId: string | null = null;
let downloadedFile: Download | null = null;

Before({ tags: "@admin-login" }, async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== "false" });
  context = await browser.newContext({ acceptDownloads: true });
  page = await context.newPage();
  page.on("dialog", async (dialog) => await dialog.dismiss());
  loginPage = new LoginPage(page);
  keycloakLoginPage = new KeycloakLoginPage(page);
  dashboardPage = new DashboardPage(page);
});

After({ tags: "@admin-login" }, async function () {
  if (adminUserId) {
    await deleteUser(adminUserId);
    adminUserId = null;
  }
  downloadedFile = null;
  await browser?.close();
});

async function setUserAsAdmin(userId: string) {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db("odds_worklog_db");
    await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: "admin", firstName: "E2E", lastName: "Admin" } }
    );
  } finally {
    await client.close();
  }
}

async function deleteUser(userId: string) {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db("odds_worklog_db");
    await db.collection("user").deleteOne({ _id: new ObjectId(userId) });
  } finally {
    await client.close();
  }
}

Given("I am a registered admin user", { timeout: 60000 }, async function () {
  await loginPage.goto();
  await loginPage.waitForReady();
  await loginPage.clickLoginWithKeycloak();
  await keycloakLoginPage.waitForReady();
  await keycloakLoginPage.fillUsername("e2e-admin");
  await keycloakLoginPage.fillPassword("s3cr3t");
  await keycloakLoginPage.clickLogin();
  await dashboardPage.waitForRedirect();

  adminUserId = await dashboardPage.getUserId();
  await setUserAsAdmin(adminUserId!);
});

When("I log in with admin credentials", { timeout: 30000 }, async function () {
  await dashboardPage.clearSessionStorage();
  await loginPage.goto();
  await dashboardPage.waitForCorporateDashboard();
});

When("I navigate to the individual income page", { timeout: 30000 }, async function () {
  await dashboardPage.navigateToIndividual();
});

When("I export income for the current month", { timeout: 60000 }, async function () {
  await dashboardPage.clickExportCurrentMonth();
  await dashboardPage.waitForExportModal();
  await dashboardPage.selectTodayInDatePicker();

  const downloadPromise = page.waitForEvent("download", { timeout: 30000 });
  await dashboardPage.clickExportIncomeButton();
  downloadedFile = await downloadPromise;
});

Then("the income file should be downloaded", async function () {
  assert.ok(downloadedFile, "Expected a file download but none occurred");
  const suggestedFilename = downloadedFile.suggestedFilename();
  assert.ok(
    suggestedFilename.includes("income_individual"),
    `Expected filename to contain 'income_individual', but got '${suggestedFilename}'`
  );
});
