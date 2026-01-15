import { Page, Locator, expect } from "@playwright/test";

export class productDetailsPage {
    page: Page;
    productPrice: Locator;
    productName: Locator;
    productDescription: Locator
    addToCartButton: Locator;
    removeFromCartButton: Locator;
    backToProductsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productPrice = page.locator(".inventory_details_price");
        this.productName = page.locator(".inventory_details_name");
        this.productDescription = page.locator(".inventory_details_desc");
        this.addToCartButton = page.locator("#add-to-cart");
        this.removeFromCartButton = page.locator("#remove");
        this.backToProductsButton = page.locator(".inventory_details_back_button");
    }

    async goBackToProducts() {
        await this.backToProductsButton.click();
    }

   async addProductToCart() {
    await expect(this.addToCartButton).toBeVisible();
    if (await this.addToCartButton.textContent() === 'Add to cart') {
    await this.addToCartButton.click();
    //needs some sort of wait here to ensure the button text changes before assertion
    await this.removeFromCartButton.waitFor({ state: 'attached' });
    await expect(this.removeFromCartButton).toHaveText('Remove');
    console.log('Product added to cart.');
    }
    else {
    console.log('Product already in cart.');
    }
    }

    async removeProductFromCart() {
    await expect(this.removeFromCartButton).toBeVisible();

    if (await this.removeFromCartButton.textContent() === 'Remove') {
    await this.removeFromCartButton.click();
    await this.addToCartButton.waitFor({ state: 'attached' });
    await expect(this.addToCartButton).toHaveText('Add to cart');
    console.log('Product removed from cart.');
    }
    }



    async getProductDetails() {
        const name = await this.productName.textContent();
        const price = await this.productPrice.textContent();
        const description = await this.productDescription.textContent();
        return {name, price, description};
}
}
