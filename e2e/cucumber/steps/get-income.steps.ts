import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import assert from "assert";
import { MongoClient, ObjectId } from "mongodb";
import { Browser, chromium } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { KeycloakLoginPage } from "../pages/keycloak-login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { AddIncomeModalPage } from "../pages/add-income-modal.page";
import { HistoryPage } from "../pages/history.page";

const MONGO_URL = "mongodb://admin:admin@127.0.0.1:27017/odds_worklog_db?authSource=admin";

let browser: Browser;
let loginPage: LoginPage;
let keycloakLoginPage: KeycloakLoginPage;
let dashboardPage: DashboardPage;
let addIncomeModalPage: AddIncomeModalPage;
let historyPage: HistoryPage;
let getIncomeUserId: string | null = null;

Before(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== "false" });
  const page = await browser.newPage();
  page.on("dialog", async (dialog) => await dialog.dismiss());
  loginPage = new LoginPage(page);
  keycloakLoginPage = new KeycloakLoginPage(page);
  dashboardPage = new DashboardPage(page);
  addIncomeModalPage = new AddIncomeModalPage(page);
  historyPage = new HistoryPage(page);
});

After(async function () {
  await browser?.close();
});

After({ tags: "@get-income" }, async function () {
  if (getIncomeUserId) {
    await clearUserIncome(getIncomeUserId);
    await clearUserRegistration(getIncomeUserId);
    getIncomeUserId = null;
  }
});

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

async function ensureUserRegisteredAsIndividual(userId: string) {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db("odds_worklog_db");
    await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { firstName: "E2E", lastName: "Test", dailyIncome: "500" } }
    );
  } finally {
    await client.close();
  }
}

Given("I am an individual user who has already submitted income this month", { timeout: 60000 }, async function () {
  await loginPage.goto();
  await loginPage.waitForReady();
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

  const userId = await dashboardPage.getUserId();
  getIncomeUserId = userId;

  await ensureUserRegisteredAsIndividual(userId!);
  await clearUserIncome(userId!);

  if (dashboardPage.getUrl().includes("/firstlogin")) {
    await dashboardPage.clearSessionStorage();
    await loginPage.goto();
  } else {
    await dashboardPage.reload();
  }
  await dashboardPage.waitForIndividualDashboard();

  await addIncomeModalPage.clickAddIncomeButton();
  await addIncomeModalPage.fillWorkDate("18");
  await addIncomeModalPage.fillWorkingHours("0");
  await addIncomeModalPage.fillSpecialIncome("0");
  await addIncomeModalPage.fillNote("E2E get income test");
  await addIncomeModalPage.clickSubmit();
  await addIncomeModalPage.clickConfirm();
  await addIncomeModalPage.waitForModalToClose();
});

When("I navigate to my income history", { timeout: 30000 }, async function () {
  await historyPage.goto();
  await historyPage.waitForReady();
});

Then("I should see my income record for this month", async function () {
  const rowCount = await historyPage.getIncomeRowCount();
  assert.ok(rowCount >= 1, `Expected at least 1 income record, but found ${rowCount}`);
});
