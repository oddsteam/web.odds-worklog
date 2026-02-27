import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import assert from "assert";
import { Browser, Page, chromium } from "@playwright/test";

const APP_URL = "http://localhost:4200";

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  page = await browser.newPage();
});

After(async function () {
  await browser?.close();
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
