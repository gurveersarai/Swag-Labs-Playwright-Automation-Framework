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

    async getProductCount() {
        return await this.productContainers.count();
    }

    async getProductNames() {
        const count = await this.productContainers.count();
        for (let i = 0; i < count; i++) {
            const itemName = await this.productContainers.nth(i).locator('.inventory_item_name').textContent();
             console.log(`Product Name:  ${itemName}`);
        }
    }

    async addAllProducts() 
    {
        let count = 0;
        for (let i = 0; i < await this.productContainers.count(); i++) {
            const addToCartButton = await this.productContainers.nth(i).locator('.btn_inventory');
            
            if (await addToCartButton.isVisible()) {
                await addToCartButton.click();
                if (await addToCartButton.textContent() === 'Remove') {
                    console.log(`Product at index ${i} added to cart.`);
                    count++;
                }
                else {
                    console.log(`Product at index ${i} is missing the Remove button.`)
                }
            } else {
                console.log(`Add to cart button not found for product at index ${i}.`);
            }
        }
        return count 
    }
}

