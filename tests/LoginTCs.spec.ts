import { test, expect } from "@playwright/test";
import POManager from "../pageObjects/POManager";
import { beforeEach } from "node:test";

test("user is able to navigate to the login page", async ({ page }) => {
  await page.goto("/");
  const poManager = new POManager(page);
  await expect(page).toHaveTitle("Swag Labs");
});

test("user is able to login successfully", async ({ page }) => {
  await page.goto("/");
  const poManager = new POManager(page);
  await poManager.loginPage.validLogin("standard_user", "secret_sauce");
});
