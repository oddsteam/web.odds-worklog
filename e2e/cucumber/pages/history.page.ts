import { Page } from "@playwright/test";

export class HistoryPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.locator("#menu-content span").filter({ hasText: "HISTORY" }).click();
    await this.page.waitForURL((url) => url.pathname.includes("/history"), { timeout: 10000 });
  }

  async waitForReady() {
    await this.page.waitForSelector("#history-table", { timeout: 15000 });
    await this.page.waitForSelector("#history-rows .history-row", { timeout: 15000 });
  }

  async getIncomeRowCount(): Promise<number> {
    return this.page.locator("#history-rows .history-row").count();
  }
}
