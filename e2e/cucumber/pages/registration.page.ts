import { Page } from "@playwright/test";

const APP_URL = "http://localhost:4200";

export class RegistrationPage {
  constructor(private page: Page) {}

  async fillFirstName(firstName: string) {
    await this.page.locator("#FirstName").fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.locator("#LastName").fill(lastName);
  }

  async fillBankAccountName(name: string) {
    await this.page.locator("#bankAccountName").fill(name);
  }

  async selectBank(bankCode: string) {
    await this.page.locator("#bankCode").selectOption(bankCode);
  }

  async fillBankAccountNumber(number: string) {
    await this.page.locator("#bankAccountNumber").fill(number);
  }

  async fillPhone(phone: string) {
    await this.page.locator("#phone").fill(phone);
  }

  async fillSlackAccount(slackAccount: string) {
    await this.page.locator("#slackAccount").fill(slackAccount);
  }

  async selectUserType(role: string) {
    await this.page.locator("#role").selectOption(role);
  }

  async selectSite() {
    const siteSelect = this.page.locator("#siteId");
    const options = await siteSelect.locator("option").all();
    for (const option of options) {
      const value = await option.getAttribute("value");
      if (value && value !== "") {
        await siteSelect.selectOption(value);
        break;
      }
    }
  }

  async uploadIdCard(fixturePath: string) {
    await this.page.locator('input[type="file"]').setInputFiles(fixturePath);
  }

  async clickSave() {
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && !url.pathname.includes("/firstlogin"),
      { timeout: 45000 }
    );
  }

  getUrl() {
    return this.page.url();
  }
}
