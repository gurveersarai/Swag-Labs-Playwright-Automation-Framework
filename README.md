# 🚀 Swag Labs Playwright Automation Framework (WIP)

A playwright test automation framework for end to end testing of the Swag Labs Website, integrated with a GitHub actions CI/CD pipeline producing an Allure Report including photo evidence.
This framework was designed with maintainability in mind, using the best practices to ensure that updates can easily be made when required such as environment files, data driven testing, page
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
├── pageObjects/
│    └── loginPage
│    └── POManager                # Contains helper code              
├── scripts/     
├── tests/
│    └── authenticatedTests/
│    └── unauthenticatedTests/
│     └── auth.setup.ts
├── utils/
│
