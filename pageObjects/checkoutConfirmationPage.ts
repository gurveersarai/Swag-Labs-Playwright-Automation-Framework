import {Page, Locator} from "playwright";

export class checkoutConfirmationPage {
    page: Page;
    paymentInformation: Locator
    totalAmount: Locator
    finishButton: Locator
    cancelButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.paymentInformation = page.locator(".summary_info:nth-of-type(1)");
        this.totalAmount = page.locator(".summary_total_label");
        this.finishButton = page.locator("#finish");
        this.cancelButton = page.locator("#cancel");
    }

    async totalAmountNumber() {
        const totalText = await this.totalAmount.textContent();
        const price = totalText?.split('$')[1] ?? '0';
        const numericPrice = parseFloat(price);
        return numericPrice;
    }
}