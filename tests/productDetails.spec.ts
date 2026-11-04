import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';

test('PROD-007: Verify product details match the selected product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(productsPage.productNames.first()).toBeVisible();
    await expect(productsPage.productPrices.first()).toBeVisible();

    const expectedName = (await productsPage.productNames.first().innerText()).trim();
    const expectedPrice = (await productsPage.productPrices.first().innerText()).trim();

    expect(expectedName).not.toBe('');
    expect(expectedPrice).toMatch(/^\$[0-9]+\.[0-9]{2}$/);

    await productsPage.clickFirstProduct();
    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);

    await expect(productDetailsPage.productName).toHaveText(expectedName);
    await expect(productDetailsPage.productPrice).toHaveText(expectedPrice);

    await productDetailsPage.backToProducts();

    await expect(productsPage.productTitle).toHaveText('Products');
    await expect(productsPage.productNames.first()).toHaveText(expectedName);
    await expect(productsPage.productPrices.first()).toHaveText(expectedPrice);
});