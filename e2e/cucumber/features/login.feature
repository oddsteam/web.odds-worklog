Feature: User Login
    As a user
    I want to be able to log in to the application
    So that I can access my worklog

    Scenario: Successful login with valid credentials
        Given I am on the login page
        When I enter valid username and password
        And I click the login button
        Then I should be logged in successfully
        And I should see the dashboard