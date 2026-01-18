import {test} from "../../fixtures/site";
import {expect} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto("/inventory.html", { waitUntil: 'load' }); 
    const currentUrl = page.url();
    expect(currentUrl).toContain("/inventory.html");
});

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

test("should be able to add and remove product to the cart on the product details page", async ({page, poManager}) => {
    await poManager.dashboardPage.clickOnProductByIndex(0);
    await poManager.productDetailsPage.addProductToCart();
    const itemsInCartAfterAdd = await poManager.commonElements.numberOfItemsInCart();
    expect(itemsInCartAfterAdd).toBe(1);
    await poManager.productDetailsPage.removeProductFromCart();
    const itemsInCartAfterRemove = await poManager.commonElements.numberOfItemsInCart();
    expect(itemsInCartAfterRemove).toBe(0);
});

test("should be able to navigate back to products from the product details page", async({page, poManager}) => {
    await poManager.dashboardPage.clickOnProductByIndex(0);
    await poManager.productDetailsPage.goBackToProducts();
    await expect(page).toHaveURL(/inventory.html/);
})


