import { Page } from "@playwright/test";

export class AddIncomeModalPage {
  constructor(private page: Page) {}

  async clickAddIncomeButton() {
    await this.page.locator("#btn-add").click();
    await this.page.locator("#specialIncome").waitFor({ state: "visible" });
  }

  async clickEditIncomeButton() {
    await this.page.locator("#btn-edit").click();
    await this.page.locator("#specialIncome").waitFor({ state: "visible" });
  }

  async fillSpecialIncome(amount: string) {
    await this.page.locator("#specialIncome").fill(amount);
    await this.page.locator("#specialIncome").dispatchEvent("keyup");
  }

  async fillWorkingHours(hours: string) {
    await this.page.locator("#workingHours").fill(hours);
    await this.page.locator("#workingHours").dispatchEvent("keyup");
  }

  async fillWorkDate(days: string) {
    await this.page.locator("#workDate").fill(days);
    await this.page.locator("#workDate").dispatchEvent("keyup");
  }

  async fillNote(note: string) {
    await this.page.locator("#note").fill(note);
  }

  async clickSubmit() {
    const incomeModal = this.page.locator(".modal:has(#modal-basic-title)");
    await incomeModal.locator("#btn-submit").click();
    await incomeModal.locator("#btn-confirm").waitFor({ state: "visible", timeout: 60000 });
  }

  async getConfirmationAmount(selector: string): Promise<number> {
    const text = await this.page.locator(selector).textContent() ?? "";
    return parseFloat(text.replace(/[^0-9.]/g, ""));
  }

  async getNetDailyIncomeText() {
    return this.page.locator("#addIncomeTotalIncome").textContent();
  }

  async clickConfirm() {
    const saved = this.page.waitForResponse(
      (response) => {
        const url = response.url();
        const method = response.request().method();
        return url.includes("/v1/incomes") && (method === "POST" || method === "PUT") && response.ok();
      },
      { timeout: 30000 }
    );
    await this.page.locator("#btn-confirm").click();
    await saved;
  }

  async waitForModalToClose() {
    await this.page.locator("#btn-confirm").waitFor({ state: "hidden", timeout: 10000 });
  }

  async waitForNetIncomeOnDashboard(expectedAmount: number) {
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(expectedAmount);
    await this.page
      .locator("#salary")
      .filter({ hasText: formatted })
      .waitFor({ timeout: 20000 });
  }

  /** Modal closes before the save request finishes; wait until the dashboard reflects it. */
  async waitForIncomeSavedOnDashboard() {
    await this.page.locator("#btn-edit").waitFor({ state: "visible", timeout: 30000 });
  }

  async getSalaryText() {
    return this.page.locator("#salary").textContent();
  }
}
