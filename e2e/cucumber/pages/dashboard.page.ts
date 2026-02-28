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

  async navigateToIndividual() {
    await this.page.locator("#menu-content span").filter({ hasText: "INDIVIDUAL" }).click();
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/individual"),
      { timeout: 15000 }
    );
  }

  async clickExportCurrentMonth() {
    await this.page.locator(".dropdown").hover();
    await this.page.locator("a").filter({ hasText: "Export เดือนปัจจุบัน" }).click();
  }

  async waitForExportModal() {
    await this.page.getByText("Export Income - Current Month").waitFor({ state: "visible", timeout: 10000 });
  }

  async selectTodayInDatePicker() {
    await this.page.locator(".fa-calendar").first().click();
    await this.page.locator("ngb-datepicker .ngb-dp-day").first().waitFor({ state: "visible", timeout: 5000 });
    const todayCell = this.page.locator("ngb-datepicker .ngb-dp-day.ngb-dp-today");
    if ((await todayCell.count()) > 0) {
      await todayCell.click();
    } else {
      const today = new Date().getDate().toString();
      await this.page.locator("ngb-datepicker .ngb-dp-day:not(.ngb-dp-hidden) .btn-light")
        .filter({ hasText: new RegExp(`^${today}$`) })
        .first()
        .click();
    }
  }

  async clickExportIncomeButton() {
    await this.page.locator("#btn-submit").click();
  }
}
