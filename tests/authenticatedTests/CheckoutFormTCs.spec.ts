import { test } from "../../fixtures/site"
import { expect } from "@playwright/test";
import personalDetails from "../../utils/personalDetails.json";
import { firstCheckoutStep } from "../../utils/cart.helper";
const data = JSON.parse(JSON.stringify(personalDetails));

test.beforeEach(async ({page}) => {
    await page.goto("/inventory.html", { waitUntil: 'load' });

});

test('should be able to see the "Checkout: Your Information" title on the checkout form page', async ({ poManager }) => {
    await firstCheckoutStep(poManager);
    const pageTitle = await poManager.commonElements.pageTitle.textContent();
    expect(pageTitle).toBe("Checkout: Your Information");
});

test('should be able to see a checkout form displayed', async({poManager }) => {
    await firstCheckoutStep(poManager);
    await expect(poManager.checkoutFormPage.checkoutFormContainer).toBeVisible();
});

test('should be redirected to the cart page when clicking cancel button on checkout form page', async ({poManager, page }) => {
    await firstCheckoutStep(poManager);
    await poManager.checkoutFormPage.cancelButton.click();
    await expect(page).toHaveURL(/.*cart.html/);
    const pageTitle = await poManager.commonElements.pageTitle.textContent();
    expect(pageTitle).toBe("Your Cart");
});

test('should display error message when trying to continue with empty checkout form', async ({poManager }) => {
    await firstCheckoutStep(poManager);
    await poManager.checkoutFormPage.continueButton.click();
    const errorMessage = await poManager.checkoutFormPage.errorMessage.textContent();
    expect(errorMessage).toBe("Error: First Name is required");
});

test('should display error message when trying to continue with partially filled checkout form', async ({ poManager }) => {
    await firstCheckoutStep(poManager);
    const firstNameOnlyError = await poManager.checkoutFormPage.fillCheckoutForm(data[0].firstName, "", "");
    expect(firstNameOnlyError).toBe("Error: Last Name is required");
});

test('should be able to proceed to the next checkout step with valid checkout form', async ({poManager, page }) => {
    await firstCheckoutStep(poManager);
    const errorMessage = await poManager.checkoutFormPage.fillCheckoutForm(data[0].firstName, data[0].lastName, data[0].postalCode);
    const pageTitle = await poManager.commonElements.pageTitle.textContent();
    expect(errorMessage).toBeNull();
    expect(page).toHaveURL(/checkout-step-two.html/);
    expect(pageTitle).toBe("Checkout: Overview");
});


