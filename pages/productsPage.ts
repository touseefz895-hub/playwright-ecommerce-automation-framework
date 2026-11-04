import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('[data-test="title"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
        this.productPrices = page.locator('[data-test="inventory-item-price"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

     async sortProducts(sortValue: string)
   {
    await this.sortDropdown.selectOption(sortValue);
   }

   async clickFirstProduct() {
    await this.productNames.first().click();
   }
}