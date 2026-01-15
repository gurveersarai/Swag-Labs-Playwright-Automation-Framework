import POManager from "../pageObjects/POManager";

export async function addItemToCart(poManager: POManager) {
  await poManager.dashboardPage.addAllProducts();
  await poManager.page.evaluate(() => window.scrollTo(0, 0));
  await poManager.commonElements.cartIcon.click();
}

export async function firstCheckoutStep(poManager: POManager) {
    await addItemToCart(poManager);
    await poManager.cartPage.checkoutButton.click();

}