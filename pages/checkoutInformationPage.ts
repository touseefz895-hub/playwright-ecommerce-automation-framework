import { Page, Locator } from '@playwright/test';

export class CheckoutInformationPage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly title: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.title = page.locator('[data-test="title"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');
       }

    async fillInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }
}