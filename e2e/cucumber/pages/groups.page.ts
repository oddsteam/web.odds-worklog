import { Page } from "@playwright/test";

const APP_URL = "http://localhost:4200";

export class GroupsPage {
  constructor(private page: Page) {}

  /**
   * SPA navigate via tab menu. Do not use page.goto — layouts.ngOnInit
   * redirects user-admin to /users on full page load.
   */
  async navigateToGroups() {
    await this.page.locator("#menu-content span").filter({ hasText: "GROUPS" }).click();
    await this.waitForReady();
  }

  /** Leave and re-enter Groups so Mongo-seeded sites are fetched again. */
  async refreshGroups() {
    await this.page.locator("#menu-content span").filter({ hasText: "USERS" }).click();
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/users"),
      { timeout: 15000 }
    );
    const sitesLoaded = this.page.waitForResponse(
      (resp) => resp.url().includes("/v1/sites") && resp.ok(),
      { timeout: 15000 }
    );
    await this.page.locator("#menu-content span").filter({ hasText: "GROUPS" }).click();
    await sitesLoaded;
    await this.waitForReady();
  }

  async waitForSiteListed(name: string) {
    await this.page
      .locator(".site-item .link-text")
      .filter({ hasText: new RegExp(`^${escapeRegExp(name)}$`) })
      .waitFor({ state: "visible", timeout: 15000 });
  }

  async waitForReady() {
    await this.page.waitForURL(
      (url) => url.origin === APP_URL && url.pathname.includes("/groups"),
      { timeout: 15000 }
    );
    await this.page.getByRole("button", { name: "Add site" }).waitFor({
      state: "visible",
      timeout: 15000,
    });
  }

  async createSite(name: string) {
    // Accept prompt as soon as it opens so Playwright click is not blocked.
    this.page.once("dialog", (dialog) => {
      void dialog.accept(name);
    });
    await this.page.getByRole("button", { name: "Add site" }).click();
    await this.page
      .locator(".site-item .link-text")
      .filter({ hasText: new RegExp(`^${escapeRegExp(name)}$`) })
      .waitFor({ state: "visible", timeout: 15000 });
  }

  async renameSite(oldName: string, newName: string) {
    const card = this.siteCard(oldName);
    await card.waitFor({ state: "visible", timeout: 15000 });
    this.page.once("dialog", (dialog) => {
      void dialog.accept(newName);
    });
    await card.locator('a[title="Edit"]').click();
    await this.page
      .locator(".site-item .link-text")
      .filter({ hasText: new RegExp(`^${escapeRegExp(newName)}$`) })
      .waitFor({ state: "visible", timeout: 15000 });
  }

  async deleteSite(name: string) {
    const card = this.siteCard(name);
    await card.waitFor({ state: "visible", timeout: 15000 });
    this.page.once("dialog", (dialog) => {
      void dialog.accept();
    });
    await card.locator('a[title="Delete"]').click();
  }

  async tryDeleteSite(name: string) {
    const card = this.siteCard(name);
    await card.waitFor({ state: "visible", timeout: 15000 });
    // confirm, then optional error alert
    let dialogCount = 0;
    const onDialog = (dialog: { accept: () => Promise<void> }) => {
      dialogCount += 1;
      void dialog.accept();
      if (dialogCount >= 2) {
        this.page.off("dialog", onDialog);
      }
    };
    this.page.on("dialog", onDialog);
    await card.locator('a[title="Delete"]').click();
    // Give alert time to appear if site is in use
    await this.page.waitForTimeout(1000);
    this.page.off("dialog", onDialog);
  }

  async hasSite(name: string): Promise<boolean> {
    const locator = this.page
      .locator(".site-item .link-text")
      .filter({ hasText: new RegExp(`^${escapeRegExp(name)}$`) });
    return (await locator.count()) > 0;
  }

  async waitForSiteAbsent(name: string) {
    const locator = this.page
      .locator(".site-item .link-text")
      .filter({ hasText: new RegExp(`^${escapeRegExp(name)}$`) });
    await locator.waitFor({ state: "detached", timeout: 15000 }).catch(async () => {
      const stillThere = await this.hasSite(name);
      if (stillThere) {
        throw new Error(`Expected site "${name}" to be removed`);
      }
    });
  }

  private siteCard(name: string) {
    return this.page.locator(".site-item").filter({
      has: this.page
        .locator(".link-text")
        .filter({ hasText: new RegExp(`^${escapeRegExp(name)}$`) }),
    });
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
