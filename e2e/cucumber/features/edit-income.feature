Feature: Edit Income
    As a registered individual user
    I want to edit my income for the month
    So that I can correct my income record

    @edit-income
    Scenario: Individual user edits monthly income
        Given I am an individual user with a daily income rate of 500 baht per day who has submitted income for 18 work days
        When I edit my income to 20 work days and 0 hours of special work at 0 baht per hour
        Then the income confirmation breakdown should be:
            | net daily income   | 10000 |
            | net special income | 0     |
            | net income         | 9700  |
        When I confirm the income submission
        Then my net income on the dashboard should be 9700 baht
