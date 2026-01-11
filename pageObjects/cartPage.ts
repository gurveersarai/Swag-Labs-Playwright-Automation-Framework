import { Locator, Page } from "@playwright/test";
export class cartPage {
    page: Page;
    continueShoppingButton: Locator;
    checkoutButton: Locator;
    removeFromCartButton: Locator;
    cartItems: Locator;
    cartListHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueShoppingButton = page.locator("#continue-shopping");
        this.checkoutButton = page.locator("#checkout");
        this.removeFromCartButton = page.locator(".cart_item button");
        this.cartItems = page.locator(".cart_item");
        this.cartListHeader = page.locator(".cart_list");
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

  async retrieveCartItems() {
  const itemDetails: { name: string; price: string }[] = [];
  const itemCount = await this.cartItems.count();

  for (let i = 0; i < itemCount; i++) {
    const name = (await this.cartItems.nth(i).locator(".inventory_item_name").textContent())?.trim() || "";
    const price = (await this.cartItems.nth(i).locator(".inventory_item_price").textContent())?.trim() || "0";
    itemDetails.push({ name, price });
  }
  return itemDetails;
}

  async removeItem(index: number) {
    await this.removeFromCartButton.nth(index).click();
    console.log(`Removed item at index ${index} from cart.`);
  }
}