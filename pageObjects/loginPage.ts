import { Page, Locator } from "@playwright/test";

export default class LoginPage {
  page: Page;
  signInButton: Locator;
  usernameField: Locator;
  passwordField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator("#login-button");
    this.usernameField = page.locator("#user-name");
    this.passwordField = page.locator("#password");
  }

  async validLogin(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
