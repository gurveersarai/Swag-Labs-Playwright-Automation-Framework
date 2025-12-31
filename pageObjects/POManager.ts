import { Page, Locator } from "playwright";
import LoginPage from "./loginPage";

export default class POManager {
  loginPage: LoginPage;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }
}
