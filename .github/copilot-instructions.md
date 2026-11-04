# GitHub Copilot Instructions — Playwright E-commerce Automation Framework

## Project overview
- This repository is a professional QA automation portfolio project testing SauceDemo using Playwright and TypeScript.
- Follow the existing Page Object Model (POM) architecture.
- Keep tests readable, maintainable, deterministic, and suitable for GitHub Actions CI.

## Existing project structure and conventions
- Test specs live in `tests/`, including `login.spec.ts` and `products.spec.ts`.
- Page objects live in `pages/`, including `loginPage.ts` and `productsPage.ts`.
- Use existing classes, methods, and locators before proposing new ones.
- Existing page objects include `LoginPage` and `ProductsPage`.
- `ProductsPage` already has `productNames`, `productPrices`, `sortProducts(sortValue)`, and `clickFirstProduct()`.
- For a product detail view, prefer a separate `ProductDetailsPage` class when needed.
- Test case titles start with IDs such as `AUTH-001` or `PROD-007`.
- Use Playwright's `test`, `expect`, `Page`, and `Locator` appropriately.

## Coding and test quality
- Keep page-specific selectors and browser interactions in page objects; keep scenario flow and assertions in spec files.
- Prefer stable `data-test` locators and Playwright auto-waiting assertions.
- Avoid fixed timeouts, duplicated logic, unnecessary dependencies, and modifications unrelated to the current task.
- Verify both the intended behavior and relevant preconditions, so empty arrays or missing elements cannot make tests pass falsely.
- When checking sorting, copy the actual array before sorting the expected result; never mutate the original array used for comparison.
- For numeric price sorting, convert displayed price strings to numbers and use a numeric comparator.
- Never claim a test passed unless its actual execution result is available.

## Collaboration and learning style
- Explain concepts in clear, beginner-friendly Roman Urdu. Keep code, filenames, API names, and identifiers in English.
- Work one small step at a time. Do not generate the entire solution unless explicitly asked.
- When asked to propose a change, show the proposed code and explain it before editing files.
- Do not create, edit, delete, commit, push, or refactor files without explicit permission for that action.
- Do not overwrite existing work. Preserve the user's changes.
- Explain new TypeScript and Playwright concepts, especially `async`/`await`, locators, assertions, arrays, `map`, spread syntax, and comparators.
- Help the user understand and review AI-generated code rather than encouraging blind copy/paste.

## Current workflow
- Authentication tests `AUTH-001` through `AUTH-005` have been implemented.
- Product tests `PROD-001` through `PROD-006` have been implemented and reported passing locally.
- `PROD-007` will validate product details: capture the first listing item's name and price, open it, compare detail name and price, and return to listing.
- The `clickFirstProduct()` method has already been added to `ProductsPage`.
- Next planned step: propose `pages/productDetailsPage.ts` with name, price, back-button locators and `backToProducts()` method. Do not create the file without permission.