import { test as base, Page } from "@playwright/test"; 
import POManager from "../pageObjects/POManager";

type MyFixtures = {
  poManager: POManager;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  poManager: async ({ page }, use) => {
     const storageStatePath = test.info().project.use?.storageState;
    
    if (storageStatePath) {
      // Authenticated tests - go straight to dashboard
      await page.goto("/inventory.html"); // or wherever your dashboard is
    } else {
      // Login tests - go to login page
      await page.goto("/");
    }
    const poManager = new POManager(page);
    await use(poManager);
    console.log("Fixture completed");
   
  },

});
