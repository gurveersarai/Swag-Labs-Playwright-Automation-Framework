import { test } from "../fixtures/site";
import { expect } from "@playwright/test";

test.use({ storageState: 'playwright/.auth/standard-user.json' });

test("should be able to see the logout link in the menu", async ({ page, poManager }) => {
    await poManager.commonElements.hambergerMenuButton.click();
    await expect(poManager.commonElements.logoutLink).toBeVisible();
});

test("should be able to logout successfully", async ({ page, poManager }) => {
    await poManager.commonElements.hambergerMenuButton.click();
    await poManager.commonElements.logout();
    await expect(poManager.loginPage.loginContainer).toBeVisible();
});