import { Page } from "@playwright/test";

export class KeycloakLoginPage {
  constructor(private page: Page) {}

  async waitForReady(timeout?: number) {
    await this.page.waitForURL(/localhost:9000/, timeout ? { timeout } : undefined);
  }

  async fillUsername(username: string) {
    await this.page.locator("#username").fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator("#password").fill(password);
  }

  async clickLogin() {
    await this.page.locator("#kc-login").click();
  }
}
