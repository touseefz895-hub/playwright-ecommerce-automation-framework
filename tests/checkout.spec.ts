import { test , expect} from './fixture';
import { checkoutData, checkoutValidationCases } from '../test-data/checkoutData';


test.describe('Checkout Module', () => {
  

   test.beforeEach(async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL(/inventory\.html$/);
});

    test('CHK-001: Complete checkout and verify order details and total', async ({productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage}) => {
        const expectedProduct = await productsPage.getFirstProductDetails();

        await productsPage.addFirstProductToCart();
        await cartPage.openCart();

        await expect(cartPage.cartTitle).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.cartItemNames).toHaveText([expectedProduct.name]);
        await expect(cartPage.cartItemPrices).toHaveText([expectedProduct.price]);
        await expect(cartPage.cartItemQuantities).toHaveText(['1']);

        await cartPage.proceedToCheckout();

        await expect(checkoutInformationPage.title).toHaveText(
            'Checkout: Your Information'
        );

        await checkoutInformationPage.fillInformation(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );
        await checkoutInformationPage.continueToOverview();

        await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
        await expect(checkoutOverviewPage.itemNames).toHaveText([expectedProduct.name]);
        await expect(checkoutOverviewPage.itemPrices).toHaveText([expectedProduct.price]);
        await expect(checkoutOverviewPage.itemQuantities).toHaveText(['1']);

        const itemPriceCents = Math.round(
            Number(expectedProduct.price.replace('$', '')) * 100
        );
        const expectedTaxCents = Math.round(itemPriceCents * 0.08);
        const expectedTotalCents = itemPriceCents + expectedTaxCents;

        await expect(checkoutOverviewPage.itemTotal).toHaveText(
            `Item total: ${expectedProduct.price}`
        );
        await expect(checkoutOverviewPage.tax).toHaveText(
            `Tax: ${checkoutOverviewPage.formatPrice(expectedTaxCents)}`
        );
        await expect(checkoutOverviewPage.total).toHaveText(
            `Total: ${checkoutOverviewPage.formatPrice(expectedTotalCents)}`
        );

        await checkoutOverviewPage.finishOrder();

        await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
        await expect(checkoutCompletePage.confirmationMessage).toHaveText(
            'Thank you for your order!'
        );
    });
    test('CHK-002: Verify multiple products and totals on checkout overview', async ({page, productsPage, cartPage, checkoutOverviewPage, checkoutCompletePage, checkoutInformationPage}) => {
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

    await expect(checkoutInformationPage.title).toHaveText(
        'Checkout: Your Information'
    );

    await checkoutInformationPage.fillInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );
    await checkoutInformationPage.continueToOverview();

    await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
    await expect(checkoutOverviewPage.itemNames).toHaveText(
        expectedProducts.map(product => product.name)
    );
    await expect(checkoutOverviewPage.itemPrices).toHaveText(
        expectedProducts.map(product => product.price)
    );
    await expect(checkoutOverviewPage.itemQuantities).toHaveText(['1', '1']);

    const itemTotalCents = expectedProducts.reduce((sum, product) => {
        const priceCents = Math.round(
            Number(product.price.replace('$', '')) * 100
        );
        return sum + priceCents;
    }, 0);

    const expectedTaxCents = Math.round(itemTotalCents * 0.08);
    const expectedTotalCents = itemTotalCents + expectedTaxCents;

    await expect(checkoutOverviewPage.itemTotal).toHaveText(
        `Item total: ${checkoutOverviewPage.formatPrice(itemTotalCents)}`
    );
    await expect(checkoutOverviewPage.tax).toHaveText(
        `Tax: ${checkoutOverviewPage.formatPrice(expectedTaxCents)}`
    );
    await expect(checkoutOverviewPage.total).toHaveText(
        `Total: ${checkoutOverviewPage.formatPrice(expectedTotalCents)}`
    );
});
for (const testData of checkoutValidationCases) {
    test(
        `${testData.testCaseId}: ${testData.title}`,
        async ({ page, productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
            await productsPage.addFirstProductToCart();
            await cartPage.openCart();

            await expect(cartPage.cartItems).toHaveCount(1);

            await cartPage.proceedToCheckout();

            await expect(checkoutInformationPage.title).toHaveText(
                'Checkout: Your Information'
            );

            await checkoutInformationPage.fillInformation(
                testData.firstName,
                testData.lastName,
                testData.postalCode
            );
            await checkoutInformationPage.continueToOverview();

            await expect(checkoutInformationPage.errorMessage).toHaveText(
                testData.expectedErrorMessage
            );
            await expect(page).toHaveURL(/checkout-step-one\.html$/);
            await expect(checkoutInformationPage.title).toHaveText(
                'Checkout: Your Information'
            );
        }
    );
}
test('CHK-006: Verify Order Completion Page', async ({page, productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
    const expectedProduct = await productsPage.getFirstProductDetails();

    await productsPage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartTitle).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItemNames).toHaveText([expectedProduct.name]);
    await expect(cartPage.cartItemPrices).toHaveText([expectedProduct.price]);
    await expect(cartPage.cartItemQuantities).toHaveText(['1']);

    await cartPage.proceedToCheckout();

    await expect(checkoutInformationPage.title).toHaveText(
        'Checkout: Your Information'
    );

    await checkoutInformationPage.fillInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );
    await checkoutInformationPage.continueToOverview();

    await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');

    await expect(checkoutOverviewPage.itemNames).toHaveText([expectedProduct.name]);
    await expect(checkoutOverviewPage.itemPrices).toHaveText([expectedProduct.price]);
    await expect(checkoutOverviewPage.itemQuantities).toHaveText(['1']);

    const itemPriceCents = Math.round(
        Number(expectedProduct.price.replace('$', '')) * 100
    );
    const expectedTaxCents = Math.round(itemPriceCents * 0.08);
    const expectedTotalCents = itemPriceCents + expectedTaxCents;

    await expect(checkoutOverviewPage.itemTotal).toHaveText(
        `Item total: ${expectedProduct.price}`
    );
    await expect(checkoutOverviewPage.tax).toHaveText(
        `Tax: ${checkoutOverviewPage.formatPrice(expectedTaxCents)}`
    );
    await expect(checkoutOverviewPage.total).toHaveText(
        `Total: ${checkoutOverviewPage.formatPrice(expectedTotalCents)}`
    );

    await checkoutOverviewPage.finishOrder();

    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutCompletePage.confirmationMessage).toHaveText(
        'Thank you for your order!'
    );
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
    await expect(checkoutCompletePage.generatePdfOrderButton).toBeVisible();
});
});