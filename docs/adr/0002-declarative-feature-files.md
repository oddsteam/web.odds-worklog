# ADR 0002: Declarative Feature Files — Business Activities over UI Steps

## Status

Accepted

## Context

After adopting the Page Object Pattern (ADR 0001), feature files still contained low-level UI steps. For example, the registration scenario read:

```gherkin
Given I am logged in and on the registration page
When I fill in first name "E2E" and last name "Test"
And I fill in bank account name "ทดสอบ อี ทู อี"
And I select bank "ttb"
And I fill in bank account number "1234567890"
And I fill in phone "0812345678"
And I fill in slack account "e2etest@oddsteam.com"
And I select user type "individual"
And I select a site
And I upload the ID card PDF
And I click the save button
Then I should be on the individual dashboard
```

And the add income scenario read:

```gherkin
When I click the Add Income button
And I fill in special income "100" and working hours "20"
And I fill in work date "18"
And I fill in income note "E2E test income"
And I click the Submit button
```

This style causes several problems:

- **Feature files are not readable by non-technical stakeholders** — product owners and business analysts must wade through UI mechanics to find the business intent.
- **Business rules are invisible** — a step like `And I fill in work date "18"` says nothing about *why* 18 days matters or what outcome is expected.
- **Feature files become change-sensitive** — renaming a button or restructuring a form requires updating the feature file, not just the page object.
- **Low signal-to-noise ratio** — the number of steps grows with UI complexity, not with business complexity.

## Decision

Feature files must express **business activities and outcomes only**. UI interactions, form field names, button clicks, and technical setup are hidden inside step definitions and page objects.

### Rules

1. **Steps describe what the user is doing in business terms**, not how the UI is operated.
   - ✅ `When I complete my individual registration`
   - ❌ `When I fill in first name "E2E" and last name "Test"`

2. **Business data belongs in the feature file; test fixture details do not.**
   - ✅ `Given I am an individual user with daily income rate of 500 baht per day`
   - ❌ A hardcoded `E2E_DAILY_INCOME = 500` constant buried in the step file

3. **Assertions express business outcomes, not UI state.**
   - ✅ `Then my net income on the dashboard should be 10670 baht`
   - ❌ `Then the modal should close`

4. **DataTables are appropriate for expressing structured business data** (e.g. an income breakdown) when multiple related values are being verified at once.

### Result

The same scenarios after applying this decision:

```gherkin
Scenario: Individual contractor completes registration
    Given I am logged in for the first time
    When I complete my individual registration
    Then I should be on the individual dashboard
```

```gherkin
Scenario: Individual user submits monthly income
    Given I am an individual user with daily income rate of 500 baht per day
    When I submit income for 18 work days and 20 hours of special work at 100 baht per hour
    Then the income confirmation breakdown should be:
        | net daily income   | 9000  |
        | net special income | 2000  |
        | net income         | 10670 |
    When I confirm the income submission
    Then my net income on the dashboard should be 10670 baht
```

The step definitions absorb the UI complexity. A step like `When I complete my individual registration` fills all required fields using hardcoded test data — those details are irrelevant to the business scenario being described.

## Consequences

### Positive

- **Feature files are readable by everyone** — a product owner can read a scenario and immediately understand the business flow and expected outcome.
- **Business rules are explicit** — the income formula (500 × 18 = 9,000; WHT 3% deducted) is expressed as data in the feature, not inferred from implementation.
- **Feature files are stable** — UI restructuring only touches page objects and step definitions, not the feature itself.
- **Fewer steps per scenario** — a scenario's length reflects business complexity, not UI complexity.

### Negative

- **Step definitions do more work** — a single `When` step may orchestrate multiple page object calls, making the step file denser.
- **Less granular failure messages** — when a combined step fails, it may be less obvious which UI interaction caused it (mitigated by Playwright's built-in error details and screenshots).
