import { Page, Locator } from "playwright";
import LoginPage from "./loginPage";
import DashboardPage from "./dashboardPage";
import { commonElements } from "./commonElements";
import { productDetailsPage } from "./productDetailsPage";
import { cartPage } from "./cartPage";
import { checkoutFormPage } from "./checkoutFormPage";
import { checkoutConfirmationPage } from "./checkoutConfirmationPage";

export default class POManager {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  page: Page;
  commonElements: commonElements;
  productDetailsPage: productDetailsPage
  cartPage: cartPage;
  checkoutFormPage: checkoutFormPage;
  checkoutConfirmationPage: checkoutConfirmationPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.commonElements = new commonElements(this.page);
    this.productDetailsPage = new productDetailsPage(this.page);
    this.cartPage = new cartPage(this.page);
    this.checkoutFormPage = new checkoutFormPage(this.page);
    this.checkoutConfirmationPage = new checkoutConfirmationPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCommonElements() {
    return this.commonElements;
  }

  getProductDetailsPage() {
    return this.productDetailsPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutFormPage() {
    return this.checkoutFormPage;
  }

  getCheckoutConfirmationPage() {
    return this.checkoutConfirmationPage;
  }
}
