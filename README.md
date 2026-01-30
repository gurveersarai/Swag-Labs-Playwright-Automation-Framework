# 🚀 Swag Labs Playwright Automation Framework

A playwright test automation framework for end to end testing of the Swag Labs Website, integrated with a GitHub actions CI/CD pipeline producing an Allure Report including photographic evidence for each test case. This framework was designed with maintainability in mind, using the best practices to ensure that updates can easily be made when required such as environment files, data driven testing, page
object modal and storage stage framework designs.

## 🚀 Tech Stack

- **Playwright**
- **TypeScript**
- **Node.js**
- **GitHub Actions (CI/CD)**
- **Allure Report**

## 📌 Features
- 38 applicable test cases for UI and site functionality
- Page Object Modal Architecture using a POManager to manage all created objects
- Headless and headed execution support
- Videos and trace capture on failures
- Screenshots capture regardless of results
- CI/CD implemented using GitHub Actions
- Web environment driven by .env file
- Helper functions and fixtures
- Test results output in Custom Allure Report

## 📁 Project Structure
```text
Swag-Labs-Playwright-Automation-Framework/
├── fixtures/
├── pageObjects/              # Page Object Classes
│    └── loginPage
│    └── POManager                             
├── scripts/     
├── tests/
│    └── authenticatedTests/  #Test Seperated into Folders
│    └── unauthenticatedTests/
│     └── auth.setup.ts
├── utils/                    # Contains helper code and data objects
├── .env                      # Environment configuration
├── .gitignore
├── package.json              # Project dependencies & scripts
├── playwright.config.*       # Playwright configuration
└── README.md
```
## ⚙️ Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Git

1. Clone the repository:

```bash
git clone https://github.com/gurveersarai/Swag-Labs-Playwright-Automation-Framework.git
cd Swag-Labs-Playwright-Automation-Framework
```
2. Install Dependencies
```bash
npm install
```
3. Install Playwright
```bash
npm playwright install
```
## ▶️ Running Tests
Run all tests (headless mode set by default)

```bash
npm run test
```

Run all tests and open generated Allure Report containing test results
```
npm run ci
```

Reports include:
- Screenshots
- Videos
- Traces
- Detailed failure logs

## 🧱 Page Object Model (POM)

This framework follows the Page Object Model pattern to:
- Improve maintainability
- Reduce code duplication
- Make tests easier to read and scale

## 🔐 Test Coverage
 - Login data validation
 - Product Homepage - Item Count, UI components and Add to Cart
 - Product Overview Page - UI components, Adding and Removing from the Cart
 - Cart Page - UI Components, Counting Items, Removing and Adding Items, Continue and Checkout CTAs
 - Checkout Form - data validation and UI Components
 - Checkout Confirmation Form - Purchasing items, confirming detials and navigating back to the homepage

## 🧪 Best Practices Used
- Explicit waits via Playwright auto-waiting
- Centralized selectors via POM
- Clean test isolation
- Storage State to hold login session token
- Fail-fast debugging with traces & screenshots
- Helper functions to avoid code duplication
- Data driven testing for login credentials

## 🤝 Contributing

Contributions are welcome!
Feel free to open a PR or raise an issue for improvements.
