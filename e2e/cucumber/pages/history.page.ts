import { Page } from "@playwright/test";

export class HistoryPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.locator("#menu-content span").filter({ hasText: "HISTORY" }).click();
    await this.page.waitForURL((url) => url.pathname.includes("/history"), { timeout: 10000 });
  }

  async waitForReady() {
    await this.page.waitForSelector("#history-table", { timeout: 15000 });
    const row = this.page.locator("#history-rows .history-row");
    try {
      await row.first().waitFor({ timeout: 5000 });
    } catch {
      await this.page.reload();
      await this.page.waitForSelector("#history-table", { timeout: 15000 });
      await row.first().waitFor({ timeout: 15000 });
    }
  }

  async getIncomeRowCount(): Promise<number> {
    return this.page.locator("#history-rows .history-row").count();
  }
}
