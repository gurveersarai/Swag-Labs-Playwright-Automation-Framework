import {test} from "../../fixtures/site";
import {expect} from "@playwright/test";
import { addItemToCart } from "../../utils/cart.helper";
test.beforeEach(async ({page, poManager}, testInfo) => {
    testInfo.annotations.push (
        {type: 'epic', description: 'Cart Page'}
    )
    await page.goto("/inventory.html", { waitUntil: "load" });
    const currentUrl = page.url();
    expect(currentUrl).toContain("/inventory.html");
    
});

test("user is able to continue shopping from the cart page", async ({page, poManager}) => {
    await poManager.commonElements.cartIcon.click({force: true});
    expect(page).toHaveURL(/.*cart.html/);
    await expect(poManager.cartPage.cartListHeader).toBeVisible();
});

test("user is able to see 'Your Cart' title on the cart page", async ({ poManager}) => {
    await poManager.commonElements.cartIcon.click({force: true});
    const pageTitle = await poManager.commonElements.pageTitle.textContent();
    expect(pageTitle).toBe("Your Cart");
});

test("user is able to select continue shopping CTA", async({page, poManager}) => {
    await poManager.commonElements.cartIcon.click({force: true});
    await poManager.cartPage.continueShopping();
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(poManager.commonElements.pageTitle).toHaveText("Products");
});

test("user is able to see items added to cart on the cart page", async ({poManager}) => {
    await addItemToCart(poManager);
    let count = 0;
    await poManager.cartPage.retrieveCartItems().then( async (items) => {
        for (const item of items) {
            console.log(`Item in cart - Name: ${item.name}, Price: ${item.price}`);
            count++;
        }
    });
    await expect(count).toBe(await poManager.commonElements.numberOfItemsInCart());
});

test("user is able to remove item from the cart page", async ({ poManager}) => {
    await addItemToCart(poManager);
    const initialItemCount = await poManager.commonElements.numberOfItemsInCart();
    await poManager.cartPage.removeItem(0);
    const updatedItemCount = await poManager.commonElements.numberOfItemsInCart();
    expect(updatedItemCount).toBe(initialItemCount - 1);
});

test("user is able to proceed to the checkout from from the cart page", async ({poManager, page}) => {
    await addItemToCart(poManager);
    await poManager.cartPage.checkoutButton.click();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await expect(poManager.commonElements.pageTitle).toHaveText("Checkout: Your Information");
});

