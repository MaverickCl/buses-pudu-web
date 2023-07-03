import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // e2e options here
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
    specPattern: "cypress/e2e/*.{js,jsx,ts,tsx}",
    baseUrl: 'http://localhost:5173/',
    "defaultCommandTimeout": 100000,
    "pageLoadTimeout": 100000,
    "requestTimeout": 100000,
    "responseTimeout": 100000,
    "viewportWidth": 1280,
    "viewportHeight": 720,
    "env": {
      "environmentVariable": "value"
    },
    "chromeWebSecurity": false
    },
});
