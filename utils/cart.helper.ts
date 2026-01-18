import POManager from "../pageObjects/POManager";
import personalDetails from "../utils/personalDetails.json";

const data = JSON.parse(JSON.stringify(personalDetails));

export async function addItemToCart(poManager: POManager) {
  await poManager.dashboardPage.addAllProducts();
  await poManager.page.evaluate(() => window.scrollTo(0, 0));
  await poManager.commonElements.cartIcon.click();
}

export async function firstCheckoutStep(poManager: POManager) {
    await addItemToCart(poManager);
    await poManager.cartPage.checkoutButton.click();
}

export async function completeCheckout(poManager: POManager) {
  await addItemToCart(poManager);
  await poManager.cartPage.checkoutButton.isVisible();
  await poManager.cartPage.checkoutButton.click();
  await poManager.checkoutFormPage.fillCheckoutForm(data[0].firstName, data[0].lastName, data[0].postalCode);
  await poManager.checkoutFormPage.continueButton.click();
}