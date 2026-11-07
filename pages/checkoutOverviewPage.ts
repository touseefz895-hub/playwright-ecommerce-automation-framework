import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly title: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;
    readonly itemQuantities: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.title = page.locator('[data-test="title"]');

        const items = page.locator('[data-test="inventory-item"]');
        this.itemNames = items.locator('[data-test="inventory-item-name"]');
        this.itemPrices = items.locator('[data-test="inventory-item-price"]');
        this.itemQuantities = items.locator('.cart_quantity');

        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.total = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    formatPrice(cents: number): string {
        return `$${(cents / 100).toFixed(2)}`;
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}