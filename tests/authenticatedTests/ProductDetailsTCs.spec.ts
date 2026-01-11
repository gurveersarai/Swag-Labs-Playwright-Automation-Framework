import {test} from "../../fixtures/site";
import {expect} from "@playwright/test";

test("should be able to click onto item and navigate to product details page", async ({page, poManager}) => {
    await poManager.dashboardPage.clickOnProductByIndex(0);
    await expect(page).toHaveURL(/inventory-item.html/);
})

test("should be able to see the product image and navigate to the product details page", async ({page, poManager}) => {
    await poManager.dashboardPage.clickOnProductImageByIndex(0);
    await expect(page).toHaveURL(/inventory-item.html/);
})

test("should be able to retrieve the product details", async ({page, poManager}) => {
    await poManager.dashboardPage.clickOnProductByIndex(0);
    const productDetails = await poManager.productDetailsPage.getProductDetails();
    expect(productDetails.name).toBeDefined();
    expect(productDetails.description).toBeDefined();
    expect(productDetails.price).toBeDefined();
})

test("should be able to add and remove product from the cart on the product details page", async ({page, poManager}) => {
    await poManager.dashboardPage.clickOnProductByIndex(0);
    const initialItemsInCart = await poManager.commonElements.numberOfItemsInCart();
    await poManager.productDetailsPage.addProductToCart();
    const itemsInCartAfterAdd = await poManager.commonElements.numberOfItemsInCart();
    expect(itemsInCartAfterAdd).toBe(initialItemsInCart + 1);
    await poManager.productDetailsPage.addProductToCart();
    const itemsInCartAfterRemove = await poManager.commonElements.numberOfItemsInCart();
    expect(itemsInCartAfterRemove).toBe(initialItemsInCart);
});

test("should be able to navigate back to products from the product details page", async({page, poManager}) => {
    await poManager.dashboardPage.clickOnProductByIndex(0);
    await poManager.productDetailsPage.goBackToProducts();
    await expect(page).toHaveURL(/inventory.html/);
})


