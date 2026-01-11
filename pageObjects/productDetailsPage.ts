import {Page, Locator} from "playwright";

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
        this.removeFromCartButton = page.locator("#remove-from-cart");
        this.backToProductsButton = page.locator(".inventory_details_back_button");
    }

    async goBackToProducts() {
        await this.backToProductsButton.click();
    }

    async addProductToCart() {
        if (await this.addToCartButton.isVisible()) {
            await this.addToCartButton.click();
            console.log("Product added to cart.");
        } else {
            console.log("Add to Cart button is not visible, we will try to click Remove from Cart button if visible.");
        };
        if (await this.removeFromCartButton.isVisible()) {
            await this.removeFromCartButton.click();
            console.log("Product removed from cart.");
        } else {
            console.log("Remove from Cart button is also visible.");
        }
            
    }

    async getProductDetails() {
        const name = await this.productName.textContent();
        const price = await this.productPrice.textContent();
        const description = await this.productDescription.textContent();
        return {name, price, description};
}
}
