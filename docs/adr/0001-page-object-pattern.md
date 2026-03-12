# ADR 0001: Page Object Pattern for E2E Tests

## Status

Accepted

## Context

The Cucumber step definitions in `e2e/cucumber/steps/` were written with raw Playwright selectors and interactions inline. For example:

```typescript
When("I enter valid username and password", async function () {
  await page.getByText("Login with Keycloak").click();
  await page.waitForURL(/localhost:9000/);
  await page.locator("#username").fill("e2e");
  await page.locator("#password").fill("s3cr3t");
});
```

This coupling caused several problems:

- **Selector duplication** — the same selector (e.g. `#username`) appeared in multiple steps and helper functions.
- **Brittle tests** — a UI change required hunting down every occurrence across the step file.
- **Low readability** — step definitions mixed test intent with implementation detail.
- **Poor reusability** — helper functions like `performKeycloakLogin()` duplicated selector logic instead of sharing it.

## Decision

We adopt the **Page Object Pattern** for all Cucumber E2E tests.

All Playwright interactions (selectors, navigation, waits, form fills) must live in dedicated page object classes under `e2e/cucumber/pages/`. Each class represents one logical page of the application.

Step definitions and helper functions **only** call page object methods and run assertions — they contain no selectors.

### Page object structure

```
e2e/cucumber/
  pages/
    login.page.ts           — app login page (/login)
    keycloak-login.page.ts  — Keycloak SSO form (localhost:9000)
    registration.page.ts    — first-login registration form (/firstlogin)
    dashboard.page.ts       — post-login dashboard (/individual)
```

### Page object contract

- Constructor receives a Playwright `Page` instance (dependency injection).
- Methods are named after user actions or observable state, not selectors.
- A single `Page` instance is shared across all page objects within one scenario.

```typescript
// pages/registration.page.ts
export class RegistrationPage {
  constructor(private page: Page) {}

  async fillFirstName(firstName: string) {
    await this.page.locator("#FirstName").fill(firstName);
  }
  // ...
}

// steps/login.steps.ts
When("I fill in first name {string} and last name {string}", async function (firstName, lastName) {
  await registrationPage.fillFirstName(firstName);
  await registrationPage.fillLastName(lastName);
});
```

## Consequences

### Positive

- **Single source of truth** — selector changes happen in one place only.
- **Readable steps** — step definitions read like plain English with no implementation noise.
- **Reusability** — new scenarios reuse existing page object methods without duplication.
- **Maintainability** — adding a new page means adding one new file, not touching existing steps.

### Negative

- **Indirection** — developers must look in two places (step file + page file) to trace a full interaction.
- **Discipline** — selectors must not leak back into step files; this requires vigilance in code review (enforced by the `e2e-cucumber.mdc` Cursor rule).
