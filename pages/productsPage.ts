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

   private productCard(productName: string): Locator {
    return this.page
        .locator('[data-test="inventory-item"]')
        .filter({
            has: this.page.getByText(productName, { exact: true })
        });
}

getProductActionButton(productName: string): Locator {
    return this.productCard(productName).locator(
        '[data-test^="add-to-cart-"], [data-test^="remove-"]'
    );
}

   async addFirstProductToCart(): Promise<string> {
    const firstProduct = this.page.locator('[data-test="inventory-item"]').first();

    const productName = (
        await firstProduct.locator('[data-test="inventory-item-name"]').innerText()
    ).trim();

    await firstProduct.locator('[data-test^="add-to-cart-"]').click();

    return productName;
}

async getFirstProductDetails(): Promise<{ name: string; price: string }> {
    const firstProduct = this.page.locator('[data-test="inventory-item"]').first();

    return {
        name: (await firstProduct.locator('[data-test="inventory-item-name"]').innerText()).trim(),
        price: (await firstProduct.locator('[data-test="inventory-item-price"]').innerText()).trim()
    };
}
async getProductDetails(index: number): Promise<{ name: string; price: string }> {
    const productCard = this.page
        .locator('[data-test="inventory-item"]')
        .nth(index);

    return {
        name: (await productCard.locator('[data-test="inventory-item-name"]').innerText()).trim(),
        price: (await productCard.locator('[data-test="inventory-item-price"]').innerText()).trim()
    };
}
async addProductToCartByIndex(index: number) {
    const productCard = this.page
        .locator('[data-test="inventory-item"]')
        .nth(index);

    await productCard.locator('[data-test^="add-to-cart-"]').click();
}
}