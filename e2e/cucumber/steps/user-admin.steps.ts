import { Given, Before, After } from "@cucumber/cucumber";
import * as ctx from "../helpers/site-e2e-context";
import {
  setUserAsUserAdmin,
  deleteUser,
  deleteSitesByNamePrefix,
  deleteUsersByEmailPrefix,
  E2E_SITE_PREFIX,
} from "../helpers/mongo";

Before({ tags: "@manage-sites or @assign-user-site" }, async function () {
  await ctx.startBrowser();
});

After({ tags: "@manage-sites or @assign-user-site" }, async function () {
  await deleteSitesByNamePrefix(E2E_SITE_PREFIX);
  await deleteUsersByEmailPrefix("e2e-target-");
  for (const id of ctx.trackedUserIds) {
    await deleteUser(id);
  }
  ctx.clearTrackedUsers();
  if (ctx.userAdminId) {
    await deleteUser(ctx.userAdminId);
    ctx.setUserAdminId(null);
  }
  await ctx.stopBrowser();
});

Given("I am a registered user-admin", { timeout: 60000 }, async function () {
  await ctx.loginPage.goto();
  await ctx.loginPage.waitForReady();
  await ctx.loginPage.clickLoginWithKeycloak();
  try {
    await ctx.keycloakLoginPage.waitForReady(5000);
    await ctx.keycloakLoginPage.fillUsername("e2e-admin");
    await ctx.keycloakLoginPage.fillPassword("s3cr3t");
    await ctx.keycloakLoginPage.clickLogin();
  } catch {
    // Keycloak SSO session active
  }
  await ctx.dashboardPage.waitForRedirect();

  const id = await ctx.dashboardPage.getUserId();
  ctx.setUserAdminId(id);
  await setUserAsUserAdmin(id!);

  await ctx.dashboardPage.clearSessionStorage();
  await ctx.loginPage.goto();
  // Keycloak SSO re-authenticates; JWT picks up user-admin and lands on /users
  await ctx.usersPage.waitForReady();
});
