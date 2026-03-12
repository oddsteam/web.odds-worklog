Feature: Get Income
    As a registered individual user
    I want to view my income history
    So that I can track my monthly earnings

    @get-income
    Scenario: Individual user views income history
        Given I am an individual user who has already submitted income this month
        When I navigate to my income history
        Then I should see my income record for this month
