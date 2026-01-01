import { test as base, Page } from "@playwright/test"; 
import POManager from "../pageObjects/POManager";

type MyFixtures = {
  poManager: POManager;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  poManager: async ({ page }, use) => {
    await page.goto("/");
    const poManager = new POManager(page);
    await use(poManager);
    console.log("Fixture completed");
  },

  // authenticatedPage: async ({ page, poManager }, use) => {
  //   await page.goto("/");
  //   await poManager.loginPage.signIn(testData[0].username, testData[0].password);
  //   await use(page);
});
