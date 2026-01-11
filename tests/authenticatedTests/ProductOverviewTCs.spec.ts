import {test} from "../../fixtures/site";
import {expect} from "@playwright/test";

test("should be able to see the product title on the overview page", async ({page, poManager}) => {
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

test("should be able to add all items to the cart", async({page, poManager})=> {
    const count = await poManager.dashboardPage.addAllProducts();
    const itemsInCart = await poManager.commonElements.numberOfItemsInCart();
    expect(itemsInCart).toBe(count);
})

test("should be able to remove an item from the cart", async({page, poManager})=> {
    await poManager.dashboardPage.addAllProducts();
    const startingCount = await poManager.commonElements.numberOfItemsInCart();
    expect(startingCount).toBeGreaterThan(0);
    //remove one item from the cart
    await poManager.dashboardPage.removeFirstProductFromCart();
    const finalCount =  await poManager.commonElements.numberOfItemsInCart();
    expect(finalCount).toBeLessThan(startingCount);
})