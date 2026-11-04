import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('.inventory_details_name');
        this.productPrice = page.locator('.inventory_details_price');
        this.backButton = page.locator('[data-test="back-to-products"]');
    }

    async backToProducts() {
        await this.backButton.click();
    }
}