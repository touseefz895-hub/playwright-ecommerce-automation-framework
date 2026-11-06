import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly cartTitle: Locator;
    readonly cartItems: Locator;
    readonly cartBadge: Locator;
    readonly cartItemNames: Locator;
    readonly cartItemPrices: Locator;
    readonly cartItemQuantities: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartTitle = page.locator('[data-test="title"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartItemNames = this.cartItems.locator('[data-test="inventory-item-name"]');
        this. cartItemPrices = this.cartItems.locator('[data-test="inventory-item-price"]');
        this.cartItemQuantities = this.cartItems.locator('.cart_quantity');
    }

    async openCart() {
        await this.cartLink.click();
    }
}