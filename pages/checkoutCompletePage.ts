import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly title: Locator;
    readonly confirmationMessage: Locator;
    readonly backHomeButton: Locator;
    readonly generatePdfOrderButton: Locator;


    constructor(page: Page) {
        this.title = page.locator('[data-test="title"]');
        this.confirmationMessage = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.getByRole('button', {
            name: 'Back Home',
            exact: true,
        });

        this.generatePdfOrderButton = page.getByRole('button', {
            name: 'Generate PDF order',
            exact: true,
        });
    }
}