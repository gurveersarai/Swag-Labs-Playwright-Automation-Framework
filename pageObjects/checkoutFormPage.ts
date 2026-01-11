import {Page, Locator} from "playwright";
export class checkoutFormPage {
    page: Page;
    checkoutFormContainer: Locator;
    firstNameInput: Locator;
    lastNameInput: Locator;
    postalCodeInput: Locator;
    continueButton: Locator;
    cancelButton: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutFormContainer = page.locator(".checkout_info");
        this.firstNameInput = page.locator("#first-name");
        this.lastNameInput = page.locator("#last-name");
        this.postalCodeInput = page.locator("#postal-code");
        this.continueButton = page.locator("#continue");
        this.cancelButton = page.locator("#cancel");
        this.errorMessage = page.locator("[data-test='error']");
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();

        if (await this.errorMessage.isVisible()) {
        const errorMessage = await this.errorMessage.textContent();
        return errorMessage;
        } else {
        await this.page.waitForURL(/.*checkout-step-two.html/);
        return null;
    }
  }
}
