import { test } from "../fixtures/site";
import { expect } from "@playwright/test";
import testData from "../utils/testData.json";

test.use({storageState: undefined});

const data = JSON.parse(JSON.stringify(testData));
test("user is able to navigate to the login page", async ({page, poManager}) => {
  await expect(page).toHaveTitle("Swag Labs");
});

test("user sees login container on the login page", async ({page, poManager}) => {
  await expect(poManager.loginPage.loginContainer).toBeVisible();
});

test("user is able to login successfully", async ({ page, poManager }) => {
  await poManager.loginPage.signIn(data[0].username, data[0].password);
  await expect(page).toHaveURL(/.*inventory.html/);
});

test("user is not able to login with locked out credentials", async ({page, poManager}) => {
  const errorMessage = await poManager.loginPage.signIn(data[1].username,data[1].password);
  await expect(poManager.loginPage.errorMessage).toBeVisible();
  expect(errorMessage).toContain("locked out");
});

test("user is not able to login with invalid credentials", async ({page, poManager}) => {
  const errorMessage = await poManager.loginPage.signIn(data[2].username,data[2].password);
  await expect(poManager.loginPage.errorMessage).toBeVisible();
  expect(errorMessage).toContain("Username and password do not match");
});

test("user is not able to login with empty credentials", async ({page, poManager}) => {
  const errorMessage = await poManager.loginPage.signIn("","");
  await expect(poManager.loginPage.errorMessage).toBeVisible();
  expect(errorMessage).toContain("Username is required");
});

test("user is not able to login with empty password", async ({page, poManager}) => {
  const errorMessage = await poManager.loginPage.signIn(data[0].username,"");
  await expect(poManager.loginPage.errorMessage).toBeVisible();
  expect(errorMessage).toContain("Password is required");
});

test("user is not able to login with empty username", async ({page, poManager}) => {
  const errorMessage = await poManager.loginPage.signIn("",data[0].password);
  await expect(poManager.loginPage.errorMessage).toBeVisible();
  expect(errorMessage).toContain("Username is required");
});
