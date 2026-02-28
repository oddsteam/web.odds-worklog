Feature: Admin Login
    As an admin user
    I want to log in to the application
    So that I can access the corporate dashboard

    @admin-login
    Scenario: Admin user is redirected to corporate dashboard after login
        Given I am a registered admin user
        When I log in with admin credentials
        Then I should be on the corporate dashboard
