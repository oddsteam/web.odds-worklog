Feature: Add Income
    As a registered individual user
    I want to add my income for the month
    So that I can get paid

    @add-income
    Scenario: Individual user submits monthly income
        Given I am an individual user with daily income rate of 500 baht per day
        When I submit income for 18 work days and 20 hours of special work at 100 baht per hour
        Then the income confirmation breakdown should be:
            | net daily income   | 9000  |
            | net special income | 2000  |
            | net income         | 10670 |
        When I confirm the income submission
        Then my net income on the dashboard should be 10670 baht
