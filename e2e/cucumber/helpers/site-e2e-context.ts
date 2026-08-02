import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { KeycloakLoginPage } from "../pages/keycloak-login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { GroupsPage } from "../pages/groups.page";
import { UsersPage } from "../pages/users.page";

export let browser: Browser;
export let context: BrowserContext;
export let page: Page;
export let loginPage: LoginPage;
export let keycloakLoginPage: KeycloakLoginPage;
export let dashboardPage: DashboardPage;
export let groupsPage: GroupsPage;
export let usersPage: UsersPage;
export let userAdminId: string | null = null;
export let trackedUserIds: string[] = [];

export async function startBrowser() {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== "false" });
  context = await browser.newContext();
  page = await context.newPage();
  // Do not auto-dismiss dialogs — groups page uses prompt/confirm.
  loginPage = new LoginPage(page);
  keycloakLoginPage = new KeycloakLoginPage(page);
  dashboardPage = new DashboardPage(page);
  groupsPage = new GroupsPage(page);
  usersPage = new UsersPage(page);
  userAdminId = null;
  trackedUserIds = [];
}

export async function stopBrowser() {
  await browser?.close();
}

export function trackUser(userId: string) {
  trackedUserIds.push(userId);
}

export function setUserAdminId(id: string | null) {
  userAdminId = id;
}

export function clearTrackedUsers() {
  trackedUserIds.length = 0;
}
