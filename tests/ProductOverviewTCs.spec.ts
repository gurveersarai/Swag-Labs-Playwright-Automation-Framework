import {test} from "../fixtures/site";
import {expect} from "@playwright/test";

test.use({storageState: 'playwright/.auth/standard-user.json'});

test.only("should be able to see the product title on the overview page", async ({page, poManager}) => {
    const productTitle: string | null = await poManager.dashboardPage.getPageTitle();
    expect(productTitle).toBe("Products");
})

test("should be able to see all products on the overview page", async ({page, poManager}) => {
    const productsCount: number = await poManager.dashboardPage.getProductCount();
    expect(productsCount).toBeGreaterThan(0);
})

test("should be able to print all the product names on the overview page", async ({page, poManager}) => {
    const productNames = await poManager.dashboardPage.getProductNames();
})

test("should be able to add all items to the cart", async()=> {
    //const count = await poManager.dashboardPage.addAllProducts();

})