import { test as base } from "@playwright/test";
import POManager from "../pageObjects/POManager";

type MyFixtures = {
  poManager: POManager;
};

export const test = base.extend<MyFixtures>({
  poManager: async ({ page }, use) => {
    await page.goto("/");
    const poManager = new POManager(page);
    await use(poManager);
    console.log("Fixture completed");
  },
});
