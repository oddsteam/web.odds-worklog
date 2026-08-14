import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import assert from "assert";
import { MongoClient, ObjectId } from "mongodb";
import { Browser, BrowserContext, Download, Page, chromium } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { KeycloakLoginPage } from "../pages/keycloak-login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { AddIncomeModalPage } from "../pages/add-income-modal.page";

const MONGO_URL = "mongodb://admin:admin@127.0.0.1:27017/odds_worklog_db?authSource=admin";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let keycloakLoginPage: KeycloakLoginPage;
let dashboardPage: DashboardPage;
let adminUserId: string | null = null;
let incomeUserId: string | null = null;
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
  if (incomeUserId) {
    await clearUserIncome(incomeUserId);
    incomeUserId = null;
  }
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

async function clearUserIncome(userId: string) {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db("odds_worklog_db");
    await db.collection("income").deleteMany({ userId });
  } finally {
    await client.close();
  }
}

async function ensureUserRegistered(userId: string) {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db("odds_worklog_db");
    await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { firstName: "E2E", lastName: "IncomeUser" } }
    );
  } finally {
    await client.close();
  }
}

async function setDailyIncome(userId: string, dailyIncome: number) {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db("odds_worklog_db");
    await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { dailyIncome: String(dailyIncome) } }
    );
  } finally {
    await client.close();
  }
}

Given("a user has submitted income for the current month", { timeout: 60000 }, async function () {
  const tempBrowser = await chromium.launch({ headless: process.env.HEADLESS !== "false" });
  const tempPage = await tempBrowser.newPage();
  tempPage.on("dialog", async (dialog) => await dialog.dismiss());

  const tempLoginPage = new LoginPage(tempPage);
  const tempKeycloakLoginPage = new KeycloakLoginPage(tempPage);
  const tempDashboardPage = new DashboardPage(tempPage);
  const tempAddIncomePage = new AddIncomeModalPage(tempPage);

  try {
    await tempLoginPage.goto();
    await tempLoginPage.waitForReady();
    await tempLoginPage.clickLoginWithKeycloak();
    try {
      await tempKeycloakLoginPage.waitForReady(5000);
      await tempKeycloakLoginPage.fillUsername("e2e");
      await tempKeycloakLoginPage.fillPassword("s3cr3t");
      await tempKeycloakLoginPage.clickLogin();
    } catch {
      // Keycloak SSO session active — already redirected
    }
    await tempDashboardPage.waitForRedirect();

    const userId = await tempDashboardPage.getUserId();
    incomeUserId = userId;

    await ensureUserRegistered(userId!);
    await setDailyIncome(userId!, 500);
    await clearUserIncome(userId!);

    if (tempDashboardPage.getUrl().includes("/firstlogin")) {
      await tempPage.evaluate(() => sessionStorage.clear());
      await tempLoginPage.goto();
    } else {
      await tempPage.reload();
    }
    await tempDashboardPage.waitForIndividualDashboard();

    await tempAddIncomePage.clickAddIncomeButton();
    await tempAddIncomePage.fillWorkDate("18");
    await tempAddIncomePage.fillWorkingHours("0");
    await tempAddIncomePage.fillSpecialIncome("0");
    await tempAddIncomePage.fillNote("E2E admin export test");
    await tempAddIncomePage.clickSubmit();
    await tempAddIncomePage.clickConfirm();
    await tempAddIncomePage.waitForModalToClose();
  } finally {
    await tempBrowser.close();
  }
});

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
  await dashboardPage.waitForIndividualDashboard();
});

When("I navigate to the individual income page", { timeout: 30000 }, async function () {
  await dashboardPage.navigateToIndividual();
});

When("I export income for the current month", { timeout: 60000 }, async function () {
  const downloadPromise = page.waitForEvent("download", { timeout: 30000 });
  await dashboardPage.clickExportCsvCurrentMonth();
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
