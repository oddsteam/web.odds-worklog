Feature: Assign User Site
    As a user-admin
    I want to assign a site to a user
    So that the user appears under the correct group

    @assign-user-site
    Scenario: User-admin assigns a site to a user
        Given I am a registered user-admin
        And a user "E2E Target User" exists without a site
        And a site named "E2E Assign Site" exists
        When I assign "E2E Target User" to site "E2E Assign Site"
        Then "E2E Target User" should show site "E2E Assign Site"
