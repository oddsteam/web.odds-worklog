import { Given, When, Then, Before, After, DataTable } from "@cucumber/cucumber";
import assert from "assert";
import { MongoClient, ObjectId } from "mongodb";
import { Browser, chromium } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { KeycloakLoginPage } from "../pages/keycloak-login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { AddIncomeModalPage } from "../pages/add-income-modal.page";

const MONGO_URL = "mongodb://admin:admin@127.0.0.1:27017/odds_worklog_db?authSource=admin";

let browser: Browser;
let loginPage: LoginPage;
let keycloakLoginPage: KeycloakLoginPage;
let dashboardPage: DashboardPage;
let addIncomeModalPage: AddIncomeModalPage;
let addIncomeUserId: string | null = null;
let editIncomeUserId: string | null = null;

Before(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  const page = await browser.newPage();
  page.on("dialog", async (dialog) => await dialog.dismiss());
  loginPage = new LoginPage(page);
  keycloakLoginPage = new KeycloakLoginPage(page);
  dashboardPage = new DashboardPage(page);
  addIncomeModalPage = new AddIncomeModalPage(page);
});

After(async function () {
  await browser?.close();
});

After({ tags: "@add-income" }, async function () {
  if (addIncomeUserId) {
    await clearUserIncome(addIncomeUserId);
    await clearUserRegistration(addIncomeUserId);
    addIncomeUserId = null;
  }
});

After({ tags: "@edit-income" }, async function () {
  if (editIncomeUserId) {
    await clearUserIncome(editIncomeUserId);
    await clearUserRegistration(editIncomeUserId);
    editIncomeUserId = null;
  }
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

async function ensureUserRegisteredAsIndividual(userId: string) {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db("odds_worklog_db");
    await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { firstName: "E2E", lastName: "Test" } }
    );
  } finally {
    await client.close();
  }
}

async function setDailyIncomeInMongoDB(userId: string, dailyIncome: number) {
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

Given("I am an individual user with daily income rate of {int} baht per day", { timeout: 60000 }, async function (dailyIncome: number) {
  await loginPage.goto();
  await loginPage.waitForReady();
  await performKeycloakLogin();

  const userId = await dashboardPage.getUserId();
  await ensureUserRegisteredAsIndividual(userId!);
  await setDailyIncomeInMongoDB(userId!, dailyIncome);

  if (dashboardPage.getUrl().includes("/firstlogin")) {
    await dashboardPage.clearSessionStorage();
    await loginPage.goto();
  } else {
    await dashboardPage.reload();
  }

  await dashboardPage.waitForIndividualDashboard();
  addIncomeUserId = await dashboardPage.getUserId();
});

When("I submit income for {int} work days and {int} hours of special work at {int} baht per hour", { timeout: 30000 }, async function (workDays: number, workingHours: number, specialRate: number) {
  await addIncomeModalPage.clickAddIncomeButton();
  await addIncomeModalPage.fillWorkDate(String(workDays));
  await addIncomeModalPage.fillWorkingHours(String(workingHours));
  await addIncomeModalPage.fillSpecialIncome(String(specialRate));
  await addIncomeModalPage.fillNote("E2E test income");
  await addIncomeModalPage.clickSubmit();
});

const CONFIRMATION_SELECTORS: Record<string, string> = {
  "net daily income":   "#addIncomeTotalIncome",
  "net special income": "#addIncomeSpecialIncome",
  "net income":         "#addIncomeNetIncome",
};

Then("the income confirmation breakdown should be:", async function (table: DataTable) {
  for (const [label, value] of Object.entries(table.rowsHash())) {
    const selector = CONFIRMATION_SELECTORS[label];
    const displayed = await addIncomeModalPage.getConfirmationAmount(selector);
    const expected = parseFloat(value);
    assert.strictEqual(displayed, expected,
      `Expected ${label} to be ${expected}, but got ${displayed}`);
  }
});

When("I confirm the income submission", async function () {
  await addIncomeModalPage.clickConfirm();
  await addIncomeModalPage.waitForModalToClose();
});

Then("my net income on the dashboard should be {int} baht", async function (expectedAmount: number) {
  await addIncomeModalPage.waitForNetIncomeOnDashboard(expectedAmount);
});

Given(
  "I am an individual user with a daily income rate of {int} baht per day who has submitted income for {int} work days",
  { timeout: 60000 },
  async function (dailyIncome: number, workDays: number) {
    await loginPage.goto();
    await loginPage.waitForReady();
    await performKeycloakLogin();

    const userId = await dashboardPage.getUserId();
    editIncomeUserId = userId;

    await ensureUserRegisteredAsIndividual(userId!);
    await setDailyIncomeInMongoDB(userId!, dailyIncome);
    await clearUserIncome(userId!);

    if (dashboardPage.getUrl().includes("/firstlogin")) {
      await dashboardPage.clearSessionStorage();
      await loginPage.goto();
    } else {
      await dashboardPage.reload();
    }
    await dashboardPage.waitForIndividualDashboard();

    await addIncomeModalPage.clickAddIncomeButton();
    await addIncomeModalPage.fillWorkDate(String(workDays));
    await addIncomeModalPage.fillWorkingHours("0");
    await addIncomeModalPage.fillSpecialIncome("0");
    await addIncomeModalPage.fillNote("E2E edit income test - initial submission");
    await addIncomeModalPage.clickSubmit();
    await addIncomeModalPage.clickConfirm();
    await addIncomeModalPage.waitForModalToClose();
  }
);

When(
  "I edit my income to {int} work days and {int} hours of special work at {int} baht per hour",
  async function (workDays: number, workingHours: number, specialRate: number) {
    await addIncomeModalPage.clickEditIncomeButton();
    await addIncomeModalPage.fillWorkDate(String(workDays));
    await addIncomeModalPage.fillWorkingHours(String(workingHours));
    await addIncomeModalPage.fillSpecialIncome(String(specialRate));
    await addIncomeModalPage.fillNote("E2E edit income test - updated");
    await addIncomeModalPage.clickSubmit();
  }
);
