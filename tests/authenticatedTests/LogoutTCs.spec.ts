import { test } from "../../fixtures/site";
import { expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto("/inventory.html", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
});

test("should be able to see the logout link in the menu", async ({poManager }) => {
    await poManager.commonElements.hambergerMenuButton.click();
    await expect(poManager.commonElements.logoutLink).toBeVisible();
});

test("should be able to logout successfully", async ({ poManager }) => {
    await poManager.commonElements.hambergerMenuButton.click();
    await poManager.commonElements.logout();
    await expect(poManager.loginPage.loginContainer).toBeVisible();
});