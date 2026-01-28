import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
console.log("CWD:", process.cwd());
console.log("BASE_URL:", process.env.BASE_URL);
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], 
  ["allure-playwright", {
    outputFolder: 'allure-results',
    detail: true,
    suiteTitle: false,
  }]
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL || "https://google.co.uk",
    headless: false,
    //storageState: './auth/auth.setup.json',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "on",
    video: 'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts$/,  // ✅ Matches .setup.ts files
    },
    {
      name: 'authenticated-tests',
      testMatch: /tests\/authenticatedTests\/.*\.spec\.ts$/,  // ✅ Matches tests in authenticatedTests folder
      use: {
        ...devices['Desktop Chrome'],
       
        storageState: 'playwright/.auth/standard-user.json' },
        dependencies: ['setup'],
    },

    {
      name: 'unauthenticated-tests',
      testMatch: /tests\/unauthenticatedTests\/.*\.spec\.ts$/,  // ✅ Matches tests in unauthenticatedTests folder
      use: {
      ...devices['Desktop Chrome'],
      
       storageState: undefined },
       dependencies: ['setup'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
