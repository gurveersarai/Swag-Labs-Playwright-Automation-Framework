import {test} from "../fixtures/site";
import {expect, Page } from "@playwright/test";
import testData from "../utils/testData.json";  
const data = JSON.parse(JSON.stringify(testData));

test("authenticate standard user", async ({page, poManager}) => {
    await page.goto("/");
    await poManager.loginPage.signIn(data[0].username, data[0].password);
    await expect(page).toHaveURL(/.*inventory.html/);

    await page.context().storageState({path: "playwright/.auth/standard-user.json"});
});