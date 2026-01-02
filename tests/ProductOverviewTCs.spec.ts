import {test} from "../fixtures/site";
import {expect} from "@playwright/test";

test.use({storageState: 'playwright/.auth/standard-user.json'});
test.only("should be able to see the product title on the overview page", async ({page, poManager}) => {
    const productTitle: string | null = await poManager.dashboardPage.getPageTitle();
    expect(productTitle).toBe("Products");
})

