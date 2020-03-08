import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const url = 'https://worklog-dev.odds.team/login'

Given('Login worklog', () => {
  cy.visit(url);
})

