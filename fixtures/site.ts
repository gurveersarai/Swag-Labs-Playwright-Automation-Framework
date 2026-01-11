import { test as base, Page } from "@playwright/test"; 
import POManager from "../pageObjects/POManager";
import { first } from "cypress/types/lodash";

type MyFixtures = {
  poManager: POManager;
  authenticatedPage: Page;
  prefilledCartPage: Page;
  firstCheckoutFormPage: Page;
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

  prefilledCartPage: async ({poManager, page}, use) => {
    const prefilledCartPage = await poManager.commonElements.openOnPreFilledCart({poManager});
    await use(prefilledCartPage);
  },

  firstCheckoutFormPage: async({poManager, page}, use) => {
    await poManager.commonElements.openOnPreFilledCart({poManager});
    await poManager.cartPage.checkoutButton.click();
    const firstCheckoutFormPage = page;
    await use(firstCheckoutFormPage);
  }
});
