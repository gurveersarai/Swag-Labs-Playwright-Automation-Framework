import { Page, Locator } from "playwright";
import LoginPage from "./loginPage";
import DashboardPage from "./dashboardPage";

export default class POManager {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }
}
