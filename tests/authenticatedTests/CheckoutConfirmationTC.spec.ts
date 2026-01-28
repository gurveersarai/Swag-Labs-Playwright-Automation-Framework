import {test} from "../../fixtures/site";
import {expect} from "@playwright/test";
import { addItemToCart, completeCheckout } from "../../utils/cart.helper";
import POManager from "../../pageObjects/POManager";


test.beforeEach(async ({page, poManager}) => {
    await page.goto("/inventory.html", { waitUntil: "load" });
    await completeCheckout(poManager);
})

test("should be able to see the 'Checkout: Overview' title on the checkout confirmation page", async ({ poManager}) => {
    const pageTitle = await poManager.commonElements.pageTitle.textContent();
    expect(pageTitle).toBe("Checkout: Overview");
});

test("should be able to see the payment information on the checkout confirmation page", async ({ poManager }) => {
    await poManager.commonElements.scrollToTop({poManager})
    const paymentInfo = await poManager.checkoutConfirmationPage.paymentInformation.textContent();
    expect(paymentInfo).toBe("SauceCard #31337");
});

test("should be able to see the total amount on the checkout confirmation page", async ({ poManager }) => {
    await poManager.commonElements.scrollToTop({poManager})
    const totalAmount = await poManager.checkoutConfirmationPage.totalAmountNumber()
    expect(totalAmount).toBeGreaterThan(0);
});

test("should be able to finish the checkout process by clicking the finish button", async ({ poManager, page }) => {
    await poManager.commonElements.scrollToTop({poManager})
    await poManager.checkoutConfirmationPage.finishButton.click();
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    const pageTitle = await poManager.commonElements.pageTitle.textContent();
    expect(pageTitle).toBe("Checkout: Complete!");
});

test("should be able to go back to the inventory page by clicking the 'Back Home' button", async ({ poManager, page }) => {
    await poManager.commonElements.scrollToTop({poManager})
    await poManager.checkoutConfirmationPage.finishButton.click();
    await poManager.checkoutConfirmationPage.backtoProductsButton.click();
    await expect(page).toHaveURL(/.*inventory.html/);
    const pageTitle = await poManager.commonElements.pageTitle.textContent();
    expect(pageTitle).toBe("Products");
});