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
  },
});
