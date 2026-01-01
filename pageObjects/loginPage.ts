import { Page, Locator } from "@playwright/test";

export default class LoginPage {
  page: Page;
  signInButton: Locator;
  usernameField: Locator;
  passwordField: Locator;
  errorMessage: Locator;
  loginContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator("#login-button");
    this.usernameField = page.locator("#user-name");
    this.passwordField = page.locator("#password");
    this.errorMessage = page.locator("h3[data-test='error']");
    this.loginContainer = page.locator(".login-box");
  }

  async signIn(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
    if (await this.errorMessage.isVisible()) {
      const errorMessage = await this.errorMessage.textContent();
      return errorMessage;
    } else {
      await this.page.waitForURL(/.*inventory.html/);
      await this.page.waitForLoadState("networkidle");
      return null;
    }
  }
}
