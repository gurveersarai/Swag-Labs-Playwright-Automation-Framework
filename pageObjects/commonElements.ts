import {Page, Locator} from "playwright";
import POManager from "./POManager";

export class commonElements {
    page: Page;
    hambergerMenuButton: Locator;
    logoutLink: Locator;
    cartIcon: Locator;
    closeMenuButton: Locator;
    pageTitle: Locator;
    cancelButton: Locator;
    cartIconValue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hambergerMenuButton = page.locator("#react-burger-menu-btn");
        this.logoutLink = page.locator("#logout_sidebar_link");
        this.cartIcon = page.locator(".shopping_cart_link");
        this.closeMenuButton = page.locator("#react-burger-cross-btn");
        this.pageTitle = page.locator(".title");
        this.cancelButton = page.locator("#cancel");
        this.cartIconValue = page.locator(".shopping_cart_badge");
    }

    async numberOfItemsInCart() {
        //this method returns the number of items in the cart
        const itemCountText = await this.cartIconValue.textContent() ?? 0;
        console.log(`Items in cart: ${itemCountText}`);
        return itemCountText ? parseInt(itemCountText) : 0; 
    }

    async logout() {
        await this.logoutLink.click();
        return this.page;
    }

    async openOnPreFilledCart({poManager}: {poManager: POManager}) {
    await poManager.dashboardPage.addAllProducts();
    await this.page.evaluate(() => window.scrollTo(0, 0))
    await poManager.commonElements.cartIcon.click();
    return this.page;
    }
}