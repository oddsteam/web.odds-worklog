import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import * as ctx from "../helpers/site-e2e-context";
import { insertTargetUser, splitDisplayName } from "../helpers/mongo";

Given("a user {string} exists without a site", async function (displayName: string) {
  const { firstName, lastName } = splitDisplayName(displayName);
  const email = `e2e-target-${Date.now()}@odds.team`;
  const userId = await insertTargetUser({ firstName, lastName, email });
  ctx.trackUser(userId);
});

When(
  "I assign {string} to site {string}",
  { timeout: 60000 },
  async function (userDisplayName: string, siteName: string) {
    await ctx.usersPage.refreshUsers(siteName);
    await ctx.usersPage.assignSiteToUser(userDisplayName, siteName);
  }
);

Then(
  "{string} should show site {string}",
  async function (userDisplayName: string, siteName: string) {
    await ctx.usersPage.navigateToUsers();
    const shown = await ctx.usersPage.getUserSiteName(userDisplayName);
    assert.strictEqual(
      shown,
      siteName,
      `Expected ${userDisplayName} site to be ${siteName}, got ${shown}`
    );
  }
);
