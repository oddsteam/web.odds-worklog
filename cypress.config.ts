import { defineConfig } from 'cypress'

export default defineConfig({
  fileServerFolder: 'e2e/',
  fixturesFolder: 'e2e/cypress/fixtures',
  screenshotsFolder: 'e2e/cypress/screenshots',
  videosFolder: 'e2e/cypress/video',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./e2e/cypress/plugins')(on, config)
    },
    specPattern: 'e2e/cypress/integration//**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'e2e/cypress/support',
  },
})
