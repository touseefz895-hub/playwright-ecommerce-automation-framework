import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';
import { checkoutData, checkoutValidationCases } from '../test-data/checkoutData';


test.describe('Checkout Module', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let informationPage: CheckoutInformationPage;
    let overviewPage: CheckoutOverviewPage;
    let completePage: CheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        informationPage = new CheckoutInformationPage(page);
        overviewPage = new CheckoutOverviewPage(page);
        completePage = new CheckoutCompletePage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('CHK-001: Complete checkout and verify order details and total', async () => {
        const expectedProduct = await productsPage.getFirstProductDetails();

        await productsPage.addFirstProductToCart();
        await cartPage.openCart();

        await expect(cartPage.cartTitle).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.cartItemNames).toHaveText([expectedProduct.name]);
        await expect(cartPage.cartItemPrices).toHaveText([expectedProduct.price]);
        await expect(cartPage.cartItemQuantities).toHaveText(['1']);

        await cartPage.proceedToCheckout();

        await expect(informationPage.title).toHaveText(
            'Checkout: Your Information'
        );

      await informationPage.fillInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
   );
        await informationPage.continueToOverview();

        await expect(overviewPage.title).toHaveText('Checkout: Overview');
        await expect(overviewPage.itemNames).toHaveText([expectedProduct.name]);
        await expect(overviewPage.itemPrices).toHaveText([expectedProduct.price]);
        await expect(overviewPage.itemQuantities).toHaveText(['1']);

        const itemPriceCents = Math.round(
            Number(expectedProduct.price.replace('$', '')) * 100
        );
        const expectedTaxCents = Math.round(itemPriceCents * 0.08);
        const expectedTotalCents = itemPriceCents + expectedTaxCents;

        await expect(overviewPage.itemTotal).toHaveText(
            `Item total: ${expectedProduct.price}`
        );
        await expect(overviewPage.tax).toHaveText(
            `Tax: ${overviewPage.formatPrice(expectedTaxCents)}`
        );
        await expect(overviewPage.total).toHaveText(
            `Total: ${overviewPage.formatPrice(expectedTotalCents)}`
        );

        await overviewPage.finishOrder();

        await expect(completePage.title).toHaveText('Checkout: Complete!');
        await expect(completePage.confirmationMessage).toHaveText(
            'Thank you for your order!'
        );
    });
    test('CHK-002: Verify multiple products and totals on checkout overview', async () => {
    const expectedProducts = [
        await productsPage.getProductDetails(0),
        await productsPage.getProductDetails(1),
    ];

    await productsPage.addProductToCartByIndex(0);
    await productsPage.addProductToCartByIndex(1);
    await cartPage.openCart();

    await expect(cartPage.cartTitle).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.cartItemNames).toHaveText(
        expectedProducts.map(product => product.name)
    );
    await expect(cartPage.cartItemPrices).toHaveText(
        expectedProducts.map(product => product.price)
    );
    await expect(cartPage.cartItemQuantities).toHaveText(['1', '1']);
    await expect(cartPage.cartBadge).toHaveText('2');

    await cartPage.proceedToCheckout();

    await expect(informationPage.title).toHaveText(
        'Checkout: Your Information'
    );

    await informationPage.fillInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );
    await informationPage.continueToOverview();

    await expect(overviewPage.title).toHaveText('Checkout: Overview');
    await expect(overviewPage.itemNames).toHaveText(
        expectedProducts.map(product => product.name)
    );
    await expect(overviewPage.itemPrices).toHaveText(
        expectedProducts.map(product => product.price)
    );
    await expect(overviewPage.itemQuantities).toHaveText(['1', '1']);

    const itemTotalCents = expectedProducts.reduce((sum, product) => {
        const priceCents = Math.round(
            Number(product.price.replace('$', '')) * 100
        );
        return sum + priceCents;
    }, 0);

    const expectedTaxCents = Math.round(itemTotalCents * 0.08);
    const expectedTotalCents = itemTotalCents + expectedTaxCents;

    await expect(overviewPage.itemTotal).toHaveText(
        `Item total: ${overviewPage.formatPrice(itemTotalCents)}`
    );
    await expect(overviewPage.tax).toHaveText(
        `Tax: ${overviewPage.formatPrice(expectedTaxCents)}`
    );
    await expect(overviewPage.total).toHaveText(
        `Total: ${overviewPage.formatPrice(expectedTotalCents)}`
    );
});
for (const testData of checkoutValidationCases) {
    test(
        `${testData.testCaseId}: ${testData.title}`,
        async ({ page }) => {
            await productsPage.addFirstProductToCart();
            await cartPage.openCart();

            await expect(cartPage.cartItems).toHaveCount(1);

            await cartPage.proceedToCheckout();

            await expect(informationPage.title).toHaveText(
                'Checkout: Your Information'
            );

            await informationPage.fillInformation(
                testData.firstName,
                testData.lastName,
                testData.postalCode
            );
            await informationPage.continueToOverview();

            await expect(informationPage.errorMessage).toHaveText(
                testData.expectedErrorMessage
            );
            await expect(page).toHaveURL(/checkout-step-one\.html$/);
            await expect(informationPage.title).toHaveText(
                'Checkout: Your Information'
            );
        }
    );
}
test('CHK-006: Verify Order Completion Page', async ({ page }) => {
    const expectedProduct = await productsPage.getFirstProductDetails();

    await productsPage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartTitle).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItemNames).toHaveText([expectedProduct.name]);
    await expect(cartPage.cartItemPrices).toHaveText([expectedProduct.price]);
    await expect(cartPage.cartItemQuantities).toHaveText(['1']);

    await cartPage.proceedToCheckout();

    await expect(informationPage.title).toHaveText(
        'Checkout: Your Information'
    );

    await informationPage.fillInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );
    await informationPage.continueToOverview();

    await expect(overviewPage.title).toHaveText('Checkout: Overview');

    await expect(overviewPage.itemNames).toHaveText([expectedProduct.name]);
    await expect(overviewPage.itemPrices).toHaveText([expectedProduct.price]);
    await expect(overviewPage.itemQuantities).toHaveText(['1']);

    const itemPriceCents = Math.round(
        Number(expectedProduct.price.replace('$', '')) * 100
    );
    const expectedTaxCents = Math.round(itemPriceCents * 0.08);
    const expectedTotalCents = itemPriceCents + expectedTaxCents;

    await expect(overviewPage.itemTotal).toHaveText(
        `Item total: ${expectedProduct.price}`
    );
    await expect(overviewPage.tax).toHaveText(
        `Tax: ${overviewPage.formatPrice(expectedTaxCents)}`
    );
    await expect(overviewPage.total).toHaveText(
        `Total: ${overviewPage.formatPrice(expectedTotalCents)}`
    );

    await overviewPage.finishOrder();

    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(completePage.title).toHaveText('Checkout: Complete!');
    await expect(completePage.confirmationMessage).toHaveText(
        'Thank you for your order!'
    );
    await expect(completePage.backHomeButton).toBeVisible();
    await expect(completePage.generatePdfOrderButton).toBeVisible();
});
});