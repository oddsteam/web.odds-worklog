Feature: Admin Export Income
    As an admin user
    I want to log in and export individual income
    So that I can process payments

    @admin-login
    Scenario: Admin exports current month individual income
        Given a user has submitted income for the current month
        And I am a registered admin user
        When I log in with admin credentials
        And I navigate to the individual income page
        And I export income for the current month
        Then the income file should be downloaded
