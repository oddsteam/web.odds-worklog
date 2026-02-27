import { Page } from "@playwright/test";

const APP_URL = "http://localhost:4200";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(`${APP_URL}/login`);
  }

  async waitForReady() {
    await this.page.getByText("Login with Keycloak").waitFor({ state: "visible" });
  }

  async clickLoginWithKeycloak() {
    await this.page.getByText("Login with Keycloak").click();
  }
}
