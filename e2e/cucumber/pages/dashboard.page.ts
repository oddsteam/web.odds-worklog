import { Page } from "@playwright/test";

const APP_URL = "http://localhost:4200";

export class DashboardPage {
  constructor(private page: Page) {}

  async waitForRedirect() {
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && !url.pathname.includes("/login"),
      { timeout: 15000 }
    );
  }

  getUrl() {
    return this.page.url();
  }

  async getSessionToken() {
    return this.page.evaluate(() => sessionStorage.getItem("token"));
  }

  async getUserId() {
    return this.page.evaluate(() => sessionStorage.getItem("idUser"));
  }

  async clearSessionStorage() {
    await this.page.evaluate(() => sessionStorage.clear());
  }

  async waitForRedirectToFirstLogin() {
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/firstlogin"),
      { timeout: 15000 }
    );
  }

  async reload() {
    await this.page.reload();
  }

  async waitForIndividualDashboard() {
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/individual"),
      { timeout: 15000 }
    );
  }

  async waitForCorporateDashboard() {
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/corporate"),
      { timeout: 15000 }
    );
  }
}
