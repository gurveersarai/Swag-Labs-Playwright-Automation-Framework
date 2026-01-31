import { test as base, Page } from "@playwright/test"; 
import POManager from "../pageObjects/POManager";


type MyFixtures = {
  poManager: POManager;
};

export const test = base.extend<MyFixtures>({
  poManager: async ({ page }, use) => {
    await use(new POManager(page));
    console.log("Fixture completed");
  }
});
