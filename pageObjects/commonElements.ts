import {Page, Locator} from "playwright";

class commonElements {
    page: Page;
    hambergerMenuButton: Locator;
    logoutLink: Locator;
    cartIcon: Locator;
    closeMenuButton: Locator;
    pageTitle: Locator;
    cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hambergerMenuButton = page.locator("#react-burger-menu-btn");
        this.logoutLink = page.locator("#logout_sidebar_link");
        this.cartIcon = page.locator("#shopping_cart_link");
        this.closeMenuButton = page.locator("#react-burger-cross-btn");
        this.pageTitle = page.locator(".title");
        this.cancelButton = page.locator("#cancel");
    }

    async numberOfItemsInCart() {
        //this method returns the number of items in the cart
        const itemCountText = await this.cartIcon.locator(".shopping_cart_badge").textContent();
        return itemCountText ? parseInt(itemCountText) : 0; 
    }
}