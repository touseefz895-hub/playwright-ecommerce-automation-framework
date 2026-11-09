# Playwright E-Commerce Automation Framework

A TypeScript and Playwright end-to-end automation framework for validating e-commerce user journeys on [SauceDemo](https://www.saucedemo.com). The project uses the Page Object Model (POM), runs tests across desktop Chromium, Firefox, and WebKit projects, and configures both Playwright HTML and Allure reporting.

## Overview

The framework currently covers key UI workflows, including authentication, product browsing and sorting, product details, shopping-cart updates, and checkout. Tests use Playwright assertions and reusable page objects to keep browser interactions organized separately from test scenarios.

## AI-Assisted Development

This framework was developed using an **AI-assisted automation engineering approach with GitHub Copilot**.

GitHub Copilot supported code suggestions, Page Object Model (POM) implementation, test automation development, debugging, and documentation. AI-assisted suggestions were reviewed and validated to maintain code quality, reliability, and alignment with automation best practices.

The project demonstrates the integration of **AI-assisted development, human technical oversight, and modern QA automation practices**.

## Technology

- TypeScript with strict compiler options
- Playwright Test
- Page Object Model
- Allure Playwright reporter and Allure Commandline
- GitHub Actions for continuous integration

## Implemented Coverage

| Area | Implemented scenarios |
|---|---|
| Authentication | Successful login; invalid credentials; missing username or password |
| Products | Product listing and price checks; sorting by name in both directions and price in both directions |
| Product details | Product name and price match the selected listing; return to the product listing |
| Shopping cart | Empty cart; adding one or two products; product details and badge updates; removing products |
| Checkout | Checkout with one or multiple products; required-field validation; item subtotal, tax, and total; order completion |

Some test titles include case identifiers such as `AUTH`, `PROD`, `CART`, and `CHK`.

This is UI automation. API testing is not currently implemented.

## Framework Architecture

Tests are in `tests/`. Page-specific locators and browser actions are encapsulated in `pages/`, while assertions and scenarios remain in the test specs. Checkout test values and required-field cases are stored in `test-data/checkoutData.ts`.

| Path | Responsibility |
|---|---|
| `tests/` | Playwright test scenarios and assertions |
| `pages/` | Page objects, locators, and UI actions |
| `test-data/` | Checkout data and validation cases |
| `playwright.config.ts` | Test discovery, browser projects, execution settings, and reporters |
| `.github/workflows/` | GitHub Actions workflow |
| `tsconfig.json` | TypeScript compiler settings |

## Browser and Execution Configuration

The Playwright configuration defines these desktop browser projects:

- Chromium (`Desktop Chrome`)
- Firefox (`Desktop Firefox`)
- WebKit (`Desktop Safari`)

Tests are configured for full parallel execution. The worker count is not fixed for local runs; it is set to two when `CI` is truthy. CI runs use two retries, while local runs use no retries. The configuration also:

- Prevents accidental `test.only` usage in CI.
- Captures screenshots on failure.
- Sets `trace: 'on-first-retry'`. A trace is recorded when a failed test is retried, not for every first attempt. Since local runs have no retries by default, traces are normally collected on CI retries unless local retry settings are overridden.
- Uses `https://www.saucedemo.com` as the base URL.

## Installation

Use a current Node.js LTS release, consistent with the version selection in the CI workflow. Java 17 is required locally to generate Allure HTML reports.

```bash
npm ci
npx playwright install
```

The CI workflow installs browsers and their operating-system dependencies with `npx playwright install --with-deps`. Local browser dependencies may need to be installed separately, depending on your operating system.

## Running Tests

The npm scripts defined in `package.json` are:

| Command | What it does |
|---|---|
| `npm run test:e2e` | Runs the `pretest:e2e` cleanup, runs Playwright tests, and then normally runs `posttest:e2e` to generate an Allure report if the test command succeeds. |
| `npm run allure:generate` | Generates or refreshes `allure-report/` from `allure-results/`. |
| `npm run allure:open` | Opens the generated Allure report. |

Run the configured suite:

```bash
npm run test:e2e
```

Playwright CLI commands can also be run directly with `npx`:

```bash
npx playwright test
npx playwright test --project=chromium
npx playwright test tests/login.spec.ts
```

The project does not define separate npm scripts for individual browser projects or spec files.

## Debugging

Run Playwright's interactive test debugger:

```bash
npx playwright test --debug
```

To debug a particular spec or browser project:

```bash
npx playwright test tests/login.spec.ts --project=chromium --debug
```

The configuration captures screenshots on failure and records traces on the first retry. For a trace file produced by a run, open it with:

```bash
npx playwright show-trace <path-to-trace.zip>
```

## Reporting

### Playwright HTML report

The HTML reporter is configured in `playwright.config.ts`. Playwright writes its report to `playwright-report/`.

```bash
npx playwright show-report
```

### Allure report

The Allure Playwright reporter writes raw results to `allure-results/`. The `test:e2e` npm lifecycle includes a pre-script that clears old Allure results. Its `posttest:e2e` script normally runs only if the Playwright test command succeeds.

If tests fail and the Allure results were written, generate the report manually after the test run:

```bash
npm run allure:generate
npm run allure:open
```

The Allure command-line tool is a project dependency. Java 17 must be installed locally for Allure HTML report generation. The CI workflow provisions Java 17 before generating the Allure report.

Generated test and report directories are excluded from Git by `.gitignore`.

## Continuous Integration

The GitHub Actions workflow at `.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`. It runs on `ubuntu-latest` and:

1. Checks out the repository.
2. Sets up Node.js using `lts/*`.
3. Installs dependencies with `npm ci`.
4. Installs Playwright browsers and system dependencies.
5. Sets up Java 17.
6. Runs the suite with `npx playwright test`.
7. Generates an Allure report if the workflow has not been cancelled. This generation step is configured to run even if the test step fails.
8. Uploads the Playwright HTML report and the Allure report and results as workflow artifacts, with a 30-day retention period.

The workflow uploads reports even when the test step fails, unless the workflow is cancelled. It does not publish the reports as a hosted website.

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── cartPage.ts
│   ├── checkoutCompletePage.ts
│   ├── checkoutInformationPage.ts
│   ├── checkoutOverviewPage.ts
│   ├── loginPage.ts
│   ├── productDetailsPage.ts
│   └── productsPage.ts
├── test-data/
│   └── checkoutData.ts
├── tests/
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── login.spec.ts
│   ├── productDetails.spec.ts
│   └── products.spec.ts
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

## Future Enhancements

- **API testing:** Add API-level coverage alongside the existing browser tests.
- **Environment configuration:** Move the base URL and environment-specific settings out of the Playwright configuration, and document a safe way to provide environment values.
- **CI improvements:** Consider browser-specific CI jobs, dependency or browser caching, and a published report workflow if those fit the project's goals.
