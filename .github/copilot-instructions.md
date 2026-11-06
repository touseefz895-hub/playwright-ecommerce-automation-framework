# GitHub Copilot Instructions — Playwright E-commerce Automation Framework

## 1. Project Overview

- This repository is a professional QA automation portfolio project for SauceDemo using Playwright and TypeScript.
- Follow the existing Page Object Model (POM) architecture.
- Write readable, maintainable, reusable, deterministic, and CI-friendly automation code.
- Follow existing repository conventions before introducing new patterns.
- Treat the actual repository code as the source of truth.

## 2. Repository Structure and Conventions

- Test specifications belong in `tests/`.
- Page Object Model classes belong in `pages/`.
- Review existing files, classes, methods, and locators before proposing new ones.
- Reuse existing functionality where appropriate.
- Keep page-specific locators and browser interactions inside page objects.
- Keep test scenarios and assertions inside spec files.
- Follow existing naming conventions.
- Test titles must include unique test case IDs such as `AUTH-001`, `PROD-001`, or `CART-001`.
- Use Playwright's `test`, `expect`, `Page`, and `Locator` appropriately.
- Do not introduce unnecessary files, dependencies, or abstractions.

## 3. Test Case Design Rules

Before proposing automation code for a new module:

- Analyze the requested functionality and relevant existing repository code.
- Propose positive, negative, boundary, and edge-case scenarios where applicable.
- Do not invent unsupported application functionality.
- Avoid duplicate, redundant, or low-value test cases.
- Use the following test case format:

| Field | Description |
|---|---|
| Test Case ID | Unique identifier |
| Test Scenario | What is being validated |
| Preconditions | Required application state |
| Test Steps | Clear execution steps |
| Expected Result | Observable expected behavior |
| Priority | High / Medium / Low |
| Automation Feasibility | Yes / No / Conditional |

- Identify important missing coverage.
- Recommend which test cases should be automated first.
- Explain the reasoning behind automation priorities.
- Wait for explicit user approval before moving to automation planning.

## 4. Automation Planning Rules

After test cases are approved:

- Review the existing framework architecture.
- Propose an implementation plan before writing code.
- Identify existing page objects and reusable methods.
- Recommend new page objects or methods only when necessary.
- Identify proposed files and their responsibilities.
- Explain locator and assertion strategies.
- Explain test data, setup, cleanup, and test independence.
- Consider execution across Chromium, Firefox, and WebKit.
- Avoid unnecessary complexity and overengineering.
- Explain the plan in beginner-friendly Roman Urdu.
- Wait for explicit approval before implementation.

## 5. Implementation Rules

After the implementation plan is approved:

- Work on one test case or small component at a time.
- Let the user create files manually unless explicitly authorized otherwise.
- Propose code for the current approved step only.
- Explain the code before asking the user to implement it.
- Do not generate the entire module unless explicitly requested.
- Preserve existing functionality.
- Do not refactor unrelated code.
- Do not introduce changes outside the approved scope.
- Wait for user review before proceeding to the next implementation step.

## 6. Playwright and TypeScript Quality Standards

- Prefer stable `data-test` locators when available.
- Use Playwright auto-waiting and appropriate assertions.
- Avoid hardcoded waits and fixed timeouts.
- Prefer independent tests that can run in any order.
- Avoid unnecessary duplicated setup and logic.
- Use `beforeEach` when appropriate.
- Verify relevant preconditions to prevent false-positive test results.
- Ensure assertions validate actual expected behavior.
- Use clear variable names and TypeScript types.
- Avoid unnecessary `any` types.
- Do not silently ignore failures.
- Use appropriate error handling without hiding test failures.
- Keep tests reliable across configured browsers.

For product-related tests:

- Validate that required elements and arrays are not unexpectedly empty.
- When testing sorting, copy arrays before sorting expected values.
- Convert displayed prices to numbers before numeric comparison.
- Use numeric comparators for price sorting.
- Reuse existing product page methods where appropriate.

## 7. Code Review Rules

Before recommending that implementation is complete:

- Review the proposed or generated code.
- Check locator reliability.
- Check assertion quality.
- Check test independence.
- Check naming conventions.
- Check unnecessary duplication.
- Check TypeScript correctness.
- Check compliance with the existing POM architecture.
- Identify possible flaky behavior.
- Explain any issue and recommend the smallest appropriate fix.
- Do not claim that tests passed without actual execution evidence.

## 8. Test Execution and Verification

- Execute tests only when explicitly authorized.
- Start with the relevant test or spec file.
- Run broader regression tests when appropriate and approved.
- Validate TypeScript using the project's configured tooling.
- Review actual test output.
- Distinguish application defects from automation defects.
- Investigate failures rather than immediately changing assertions.
- Do not claim success without verified results.
- Report passed, failed, and skipped tests accurately.

## 9. Git, GitHub, and CI Rules

- Follow a feature-branch workflow.
- Never commit directly to `main` unless explicitly instructed.
- Do not run Git operations without user approval.
- Review changed files before staging.
- Avoid committing secrets, generated reports, unnecessary artifacts, or unrelated files.
- Use meaningful commit messages.
- Review Pull Request changes before merging.
- Verify GitHub Actions CI results.
- Investigate CI failures before recommending a merge.
- Do not commit, push, create Pull Requests, or merge without explicit permission.
- Do not claim CI passed unless actual CI results are available.

## 10. Collaboration and Learning Style

- Explain concepts in clear, beginner-friendly Roman Urdu.
- Keep code, filenames, identifiers, APIs, and test case documentation in English.
- Work one small step at a time.
- Avoid overwhelming the user with large code dumps.
- Explain new TypeScript and Playwright concepts when introduced.
- Help the user understand AI-generated code rather than blindly copying it.
- Ask short conceptual questions when useful for learning.
- Encourage independent problem-solving.
- Do not repeat explanations unnecessarily.
- Do not overwrite or discard existing user changes.

## 11. Permission and Approval Rules

- Do not create, edit, delete, or refactor files without explicit approval.
- Do not execute commands without authorization.
- Do not stage, commit, push, or merge code without permission.
- When asked to propose a change, present the proposal before modifying files.
- Approval for one action does not automatically authorize other actions.
- Stop and wait when the current approved step is complete.

## 12. Mandatory Workflow for Every New Automation Module

Follow these phases in order:

### Phase 1 — Test Case Design
- Analyze requirements.
- Propose test cases.
- Explain coverage and priorities.
- Wait for approval.

### Phase 2 — Automation Planning
- Propose POM structure, reusable methods, locators, and test organization.
- Explain the implementation approach.
- Wait for approval.

### Phase 3 — Implementation
- Implement one approved test or component at a time.
- Explain the generated code.
- Wait for code review and approval.

### Phase 4 — Code Review
- Review quality, assertions, architecture, and reliability.
- Propose fixes where needed.
- Wait for approval before applying changes.

### Phase 5 — Test Execution
- Run authorized tests.
- Analyze results and fix confirmed issues with approval.
- Verify relevant regression coverage.

### Phase 6 — GitHub Integration
- Review changes.
- Stage and commit with approval.
- Push the feature branch with approval.
- Create and review a Pull Request.
- Verify GitHub Actions CI.
- Merge only after review and explicit approval.

Never automatically advance to the next phase.

## 13. Repository Status

- Authentication, product listing, sorting, and product details automation have been implemented.
- Review actual repository files and test results to determine the current implementation status.
- Do not assume a test, file, Pull Request, or CI workflow is complete without verification.
- Determine the current module from the user's latest request rather than relying on outdated task descriptions.
