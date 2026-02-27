Feature: User Registration
    As a user
    I want to be able to register to the application
    So that I can add my income and get paid

    Scenario: New user is directed to registration after login
        Given I am a new user
        When I log in with valid credentials
        Then I should be directed to complete my registration

    @registration
    Scenario: Individual contractor completes registration
        Given I am logged in for the first time
        When I complete my individual registration
        Then I should be on the individual dashboard
