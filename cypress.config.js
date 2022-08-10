const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: 0,
  defaultCommandTimeout: 30000,
  numTestsKeptInMemory: 0,
  e2e: {
    baseUrl: 'http://www.airbnb.com'
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // setupNodeEvents(on, config) {
    //   return require('./cypress/plugins/index.js')(on, config)
    // },
  },
})