import {test, expect} from './fixture';

test.beforeEach(async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL(/inventory\.html$/);
});

test('PROD-007: Verify product details match the selected product', async ({ productsPage, productDetailPage, page }) => {
    

    await expect(productsPage.productNames.first()).toBeVisible();
    await expect(productsPage.productPrices.first()).toBeVisible();

    const expectedName = (await productsPage.productNames.first().innerText()).trim();
    const expectedPrice = (await productsPage.productPrices.first().innerText()).trim();

    expect(expectedName).not.toBe('');
    expect(expectedPrice).toMatch(/^\$[0-9]+\.[0-9]{2}$/);

    await productsPage.clickFirstProduct();
    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);

    await expect(productDetailPage.productName).toHaveText(expectedName);
    await expect(productDetailPage.productPrice).toHaveText(expectedPrice);

    await productDetailPage.backToProducts();

    await expect(productsPage.productTitle).toHaveText('Products');
    await expect(productsPage.productNames.first()).toHaveText(expectedName);
    await expect(productsPage.productPrices.first()).toHaveText(expectedPrice);
});