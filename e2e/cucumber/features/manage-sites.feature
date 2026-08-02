Feature: Manage Sites
    As a user-admin
    I want to create, rename, and delete sites
    So that I can organize users by workplace

    @manage-sites
    Scenario: User-admin creates a site
        Given I am a registered user-admin
        When I create a site named "E2E Site Alpha"
        Then the site "E2E Site Alpha" should be listed

    @manage-sites
    Scenario: User-admin renames a site
        Given I am a registered user-admin
        And a site named "E2E Site Rename Me" exists
        When I rename the site "E2E Site Rename Me" to "E2E Site Renamed"
        Then the site "E2E Site Renamed" should be listed
        And the site "E2E Site Rename Me" should not be listed

    @manage-sites
    Scenario: User-admin deletes an unused site
        Given I am a registered user-admin
        And a site named "E2E Site To Delete" exists with no users
        When I delete the site "E2E Site To Delete"
        Then the site "E2E Site To Delete" should not be listed

    @manage-sites
    Scenario: User-admin cannot delete a site that still has users
        Given I am a registered user-admin
        And a site named "E2E Site In Use" exists with an assigned user
        When I try to delete the site "E2E Site In Use"
        Then the site "E2E Site In Use" should still be listed
