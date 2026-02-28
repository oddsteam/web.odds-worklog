import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import assert from "assert";
import { MongoClient, ObjectId } from "mongodb";
import { Browser, chromium } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { KeycloakLoginPage } from "../pages/keycloak-login.page";
import { DashboardPage } from "../pages/dashboard.page";

const MONGO_URL = "mongodb://admin:admin@127.0.0.1:27017/odds_worklog_db?authSource=admin";

let browser: Browser;
let loginPage: LoginPage;
let keycloakLoginPage: KeycloakLoginPage;
let dashboardPage: DashboardPage;
let adminUserId: string | null = null;

Before({ tags: "@admin-login" }, async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== "false" });
  const page = await browser.newPage();
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

Then("I should be on the corporate dashboard", async function () {
  const url = dashboardPage.getUrl();
  assert.ok(url.includes("/corporate"), `Expected to be on /corporate, but got ${url}`);
});
