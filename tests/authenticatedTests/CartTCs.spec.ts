import {test} from '../../fixtures/site';
import {expect} from "@playwright/test";

test("user is able to continue shopping from the cart page", async ({prefilledCartPage, poManager}) => {
    
    expect(prefilledCartPage).toHaveURL(/.*cart.html/);
    await expect(poManager.cartPage.cartListHeader).toBeVisible();
});

test("user is able to see 'Your Cart' title on the cart page", async ({prefilledCartPage, poManager}) => {
    const pageTitle = await poManager.commonElements.pageTitle.textContent();
    expect(pageTitle).toBe("Your Cart");
});

test("user is able to select continue shopping CTA", async({prefilledCartPage, poManager}) => {
    await poManager.commonElements.cartIcon.click();
    await poManager.cartPage.continueShopping();
    await expect(prefilledCartPage).toHaveURL(/.*inventory.html/);
    await expect(poManager.commonElements.pageTitle).toHaveText("Products");
});

test("user is able to see items added to cart on the cart page", async ({prefilledCartPage, poManager}) => {
    let count = 0;
    await poManager.cartPage.retrieveCartItems().then( async (items) => {
        for (const item of items) {
            console.log(`Item in cart - Name: ${item.name}, Price: ${item.price}`);
            count++;
        }
    });
    await expect(count).toBe(await poManager.commonElements.numberOfItemsInCart());
});

test("user is able to remove item from the cart page", async ({prefilledCartPage, poManager}) => {
    await poManager.dashboardPage.addAllProducts();
    await poManager.commonElements.cartIcon.click();
    const initialItemCount = await poManager.commonElements.numberOfItemsInCart();
    await poManager.cartPage.removeItem(0);
    const updatedItemCount = await poManager.commonElements.numberOfItemsInCart();
    expect(updatedItemCount).toBe(initialItemCount - 1);
});

test("user is able to proceed to the checkout from from the cart page", async ({prefilledCartPage, poManager}) => {
    await poManager.cartPage.checkoutButton.click();
    await expect(prefilledCartPage).toHaveURL(/.*checkout-step-one.html/);
    await expect(poManager.commonElements.pageTitle).toHaveText("Checkout: Your Information");
});

