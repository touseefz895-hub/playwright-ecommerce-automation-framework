import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('[data-test="title"]');
    }
}