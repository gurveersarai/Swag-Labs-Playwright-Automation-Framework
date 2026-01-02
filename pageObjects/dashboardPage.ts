import {Page, Locator} from "@playwright/test";

export default class DashboardPage {
    page: Page;
    productPageTitle: Locator;
    productContainers: Locator;
    productItemLinks: Locator;
    productImg: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productPageTitle = page.locator("span.title");
        this.productContainers = page.locator(".inventory_item");
        this.productItemLinks = page.locator(".inventory_item_name");
        this.productImg = page.locator(".inventory_item_img");
    }

    async getPageTitle() {
        return await this.productPageTitle.textContent();
    }

}