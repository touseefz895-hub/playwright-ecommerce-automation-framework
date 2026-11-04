
import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/productsPage';
import { LoginPage } from '../pages/loginPage';

test.describe('Product Module', () => {
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('PROD-001: Verify six products are listed after successful login', async () => {
        await expect(productsPage.productNames).toHaveCount(6);

        const productNames = await productsPage.productNames.allTextContents();

        for (const productName of productNames) {
            expect(productName.trim()).not.toBe('');
        }

        for (const product of await productsPage.productNames.all()) {
            await expect(product).toBeVisible();
        }
    });

    test('PROD-002: Verify all products display valid prices', async () => {
        await expect(productsPage.productNames).toHaveCount(6);

        const productPrices = await productsPage.productPrices.allTextContents();

        for (const priceText of productPrices) {
            expect(priceText.trim()).not.toBe('');
            expect(priceText.trim()).toMatch(/^\$[0-9]+\.[0-9]{2}$/);

            const price = Number(priceText.replace('$', ''));
            expect(price).toBeGreaterThan(0);
        }
    });

    test('PROD-003: Verify products are sorted by name A to Z', async () => {
        await expect(productsPage.productNames).toHaveCount(6);

        await productsPage.sortProducts('za');
        await productsPage.sortProducts('az');

        const actualNames = await productsPage.productNames.allTextContents();

        const expectedNames = [...actualNames].sort();
        expect(actualNames).toEqual(expectedNames);
    });

    test('PROD-004: Verify products are sorted by Name Z to A', async () => {
        await expect(productsPage.productNames).toHaveCount(6);
        await productsPage.sortProducts('za');

        const actualNames = await productsPage.productNames.allTextContents();
        const expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a));
        expect(actualNames).toEqual(expectedNames);
    });

    test('PROD-005: Verify product prices are sorted from Low to High', async () => {
        await expect(productsPage.productNames).toHaveCount(6);
        await productsPage.sortProducts('lohi');

        const actualPrices = (await productsPage.productPrices.allTextContents())
            .map(priceText => {
                expect(priceText.trim()).toMatch(/^\$\d+\.\d{2}$/);

                const parsedPrice = Number(priceText.replace('$', ''));
                expect(Number.isFinite(parsedPrice)).toBeTruthy();

                return parsedPrice;
            });

        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        expect(actualPrices).toEqual(expectedPrices);
    });

    test('PROD-006: Verify product prices are sorted from High to Low', async () => {
        await expect(productsPage.productNames).toHaveCount(6);
        await productsPage.sortProducts('hilo');

        const actualPrices = (await productsPage.productPrices.allTextContents())
            .map(priceText => {
                expect(priceText.trim()).toMatch(/^\$\d+\.\d{2}$/);

                const parsedPrice = Number(priceText.replace('$', ''));
                expect(Number.isFinite(parsedPrice)).toBeTruthy();

                return parsedPrice;
            });

        const expectedPrices = [...actualPrices].sort((a, b) => b - a);

        expect(actualPrices).toEqual(expectedPrices);
    });
});
