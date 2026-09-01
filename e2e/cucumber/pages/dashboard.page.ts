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
    // Header sets userFlag (Y/N) after getIncomeByUserID; URL alone is not enough on slow CI.
    await this.page.locator("#btn-add, #btn-edit").first().waitFor({
      state: "visible",
      timeout: 60000,
    });
  }

  /** Manual income e2e uses the income collection; the timesheet source is on by default. */
  async useIncomeCollectionSource() {
    const toggle = this.page.locator("#useTimesheetSource");
    await toggle.waitFor({ state: "visible", timeout: 15000 });
    if (await toggle.isChecked()) {
      await this.page.locator("label[for='useTimesheetSource']").click();
    }
    await this.page.waitForFunction(() => {
      const el = document.querySelector("#useTimesheetSource") as HTMLInputElement | null;
      return !!el && !el.checked;
    });
    await this.page.locator("#btn-add, #btn-edit").first().waitFor({
      state: "visible",
      timeout: 30000,
    });
  }

  async waitForAdminLanding() {
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/individual"),
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

  /** Individual list: CSV current month downloads immediately (no modal). */
  async clickExportCsvCurrentMonth() {
    await this.page.locator(".dropdown").hover();
    await this.page.getByRole("link", { name: "Export CSV เดือนปัจจุบัน" }).click();
  }
}
