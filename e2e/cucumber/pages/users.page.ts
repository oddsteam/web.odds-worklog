import { Page } from "@playwright/test";

const APP_URL = "http://localhost:4200";

export class UsersPage {
  constructor(private page: Page) {}

  async navigateToUsers() {
    await this.page.locator("#menu-content span").filter({ hasText: "USERS" }).click();
    await this.waitForReady();
  }

  async waitForReady() {
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/users"),
      { timeout: 15000 }
    );
    await this.page.locator("h5", { hasText: "Users" }).waitFor({
      state: "visible",
      timeout: 15000,
    });
  }

  /** Soft refresh until Users page has loaded sites including siteName. */
  async refreshUsers(siteName?: string) {
    await this.page.locator("#menu-content span").filter({ hasText: "GROUPS" }).click();
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/groups"),
      { timeout: 15000 }
    );

    const sitesLoaded = this.page.waitForResponse(
      async (resp) => {
        if (!resp.url().includes("/v1/sites") || !resp.ok()) {
          return false;
        }
        if (!siteName) {
          return true;
        }
        try {
          const body = await resp.json();
          return Array.isArray(body) && body.some((s: { name?: string }) => s.name === siteName);
        } catch {
          return false;
        }
      },
      { timeout: 15000 }
    );
    const usersLoaded = this.page.waitForResponse(
      (resp) => {
        const path = new URL(resp.url()).pathname.replace(/\/$/, "");
        return path === "/v1/users" && resp.request().method() === "GET" && resp.ok();
      },
      { timeout: 15000 }
    );

    await this.page.locator("#menu-content span").filter({ hasText: "USERS" }).click();
    await Promise.all([sitesLoaded, usersLoaded]);
    await this.waitForReady();
    await this.page.locator("table tbody tr").first().waitFor({ state: "visible", timeout: 15000 });
  }

  async assignSiteToUser(userDisplayName: string, siteName: string) {
    const row = this.userRow(userDisplayName);
    await row.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(500);

    await row.locator("app-tool-tip-site a").first().click();
    await this.page.waitForTimeout(500);

    const toggle = row.locator("#dropdown button.dropdown-toggle");
    await toggle.waitFor({ state: "attached", timeout: 10000 });
    await toggle.click({ force: true });
    await this.page.waitForTimeout(500);

    const items = this.page.locator("a.dropdown-item");
    const texts = await items.allTextContents();
    const match = texts.findIndex((t) => t.trim() === siteName);
    if (match < 0) {
      throw new Error(
        `Site "${siteName}" not found in dropdown. Available: ${JSON.stringify(texts.map((t) => t.trim()))}`
      );
    }
    await items.nth(match).click({ force: true });

    await row.locator("td").nth(2).filter({ hasText: siteName }).waitFor({
      state: "visible",
      timeout: 15000,
    });
  }

  async getUserSiteName(userDisplayName: string): Promise<string> {
    const row = this.userRow(userDisplayName);
    const text = await row.locator("td").nth(2).textContent();
    return (text ?? "").trim();
  }

  private userRow(userDisplayName: string) {
    return this.page.locator("table tbody tr").filter({
      has: this.page.locator("td").filter({ hasText: userDisplayName }),
    });
  }
}
