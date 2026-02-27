Feature: User Registration
    As a user
    I want to be able to register to the application
    So that I can add my income and get paid

    Scenario: Successful login with valid credentials
        Given I am on the login page
        When I enter valid username and password
        And I click the login button
        Then I should be logged in successfully
        And I should be able to register

    @registration
    Scenario: Complete individual registration and reach the dashboard
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