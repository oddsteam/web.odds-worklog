import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import * as ctx from "../helpers/site-e2e-context";
import { insertSite, insertTargetUser } from "../helpers/mongo";

async function openGroupsWithFreshData() {
  await ctx.groupsPage.refreshGroups();
}

Given("a site named {string} exists", async function (siteName: string) {
  await insertSite(siteName);
});

Given("a site named {string} exists with no users", async function (siteName: string) {
  await insertSite(siteName);
});

Given(
  "a site named {string} exists with an assigned user",
  async function (siteName: string) {
    const siteId = await insertSite(siteName);
    const userId = await insertTargetUser({
      firstName: "E2E",
      lastName: "InUse",
      email: `e2e-target-inuse-${Date.now()}@odds.team`,
      siteId,
    });
    ctx.trackUser(userId);
  }
);

When("I create a site named {string}", { timeout: 60000 }, async function (siteName: string) {
  await ctx.groupsPage.navigateToGroups();
  await ctx.groupsPage.createSite(siteName);
});

When(
  "I rename the site {string} to {string}",
  { timeout: 60000 },
  async function (oldName: string, newName: string) {
    await openGroupsWithFreshData();
    await ctx.groupsPage.renameSite(oldName, newName);
  }
);

When("I delete the site {string}", { timeout: 60000 }, async function (siteName: string) {
  await openGroupsWithFreshData();
  await ctx.groupsPage.deleteSite(siteName);
  await ctx.groupsPage.waitForSiteAbsent(siteName);
});

When("I try to delete the site {string}", { timeout: 60000 }, async function (siteName: string) {
  await openGroupsWithFreshData();
  await ctx.groupsPage.tryDeleteSite(siteName);
});

Then("the site {string} should be listed", async function (siteName: string) {
  await openGroupsWithFreshData();
  await ctx.groupsPage.waitForSiteListed(siteName);
});

Then("the site {string} should not be listed", async function (siteName: string) {
  await openGroupsWithFreshData();
  // Allow async site cards to finish loading, then assert absence.
  await ctx.page.waitForTimeout(1500);
  assert.ok(!(await ctx.groupsPage.hasSite(siteName)), `Expected site "${siteName}" not to be listed`);
});

Then("the site {string} should still be listed", async function (siteName: string) {
  await openGroupsWithFreshData();
  await ctx.groupsPage.waitForSiteListed(siteName);
});
