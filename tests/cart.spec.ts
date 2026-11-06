import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';
import { ProductsPage } from '../pages/productsPage';


test.describe('Shopping Cart Module', () => {
    let cartPage: CartPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        cartPage = new CartPage(page);
        productsPage = new ProductsPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test.only('CART-001: Verify the initial cart is empty', async () => {
        await cartPage.openCart();

        await expect(cartPage.cartTitle).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(0);
        await expect(cartPage.cartBadge).toHaveCount(0);
    });

      test('CART-002: Verify adding one product updates the cart badge', async () => {
        const productName = await productsPage.addFirstProductToCart();

        await expect(
            productsPage.getProductActionButton(productName)
        ).toHaveText('Remove');
        await expect(cartPage.cartBadge).toHaveText('1');
    });

    test('CART-003: Verify the selected product details in the cart', async () => {
    const expectedProduct = await productsPage.getFirstProductDetails();

    await productsPage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartTitle).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItemNames).toHaveText([expectedProduct.name]);
    await expect(cartPage.cartItemPrices).toHaveText([expectedProduct.price]);
    await expect(cartPage.cartItemQuantities).toHaveText(['1']);
});
   test('CART-004: Verify two selected products and their details in the cart', async () => {
    const expectedProducts = [
        await productsPage.getProductDetails(0),
        await productsPage.getProductDetails(1)
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
});
 test('CART-005: Verify removing one of two products updates the cart and badge', async () => {
        const expectedProducts = [
            await productsPage.getProductDetails(0),
            await productsPage.getProductDetails(1)
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
        await expect(cartPage.cartBadge).toHaveText('2');

        await productsPage.getProductActionButton(expectedProducts[0].name).click();

        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.cartItemNames).toHaveText([expectedProducts[1].name]);
        await expect(cartPage.cartItemPrices).toHaveText([expectedProducts[1].price]);
        await expect(cartPage.cartItemQuantities).toHaveText(['1']);
        await expect(cartPage.cartBadge).toHaveText('1');
    });
        test('CART-006: Verify removing the only product empties the cart and badge', async () => {
        const expectedProduct = await productsPage.getProductDetails(0);

        await productsPage.addProductToCartByIndex(0);
        await cartPage.openCart();

        await expect(cartPage.cartTitle).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.cartItemNames).toHaveText([expectedProduct.name]);
        await expect(cartPage.cartItemPrices).toHaveText([expectedProduct.price]);
        await expect(cartPage.cartItemQuantities).toHaveText(['1']);
        await expect(cartPage.cartBadge).toHaveText('1');

        await productsPage.getProductActionButton(expectedProduct.name).click();

        await expect(cartPage.cartItems).toHaveCount(0);
        await expect(cartPage.cartBadge).toHaveCount(0);
    });
    test('CART-007: Verify adding and removing a product updates its button and badge', async () => {
        const expectedProduct = await productsPage.getProductDetails(0);

        await expect(productsPage.productNames.first()).toHaveText(expectedProduct.name);
        await expect(productsPage.productPrices.first()).toHaveText(expectedProduct.price);

        const productActionButton = productsPage.getProductActionButton(expectedProduct.name);

        await productActionButton.click();

        await expect(productActionButton).toHaveText('Remove');
        await expect(cartPage.cartBadge).toHaveText('1');

        await productActionButton.click();

        await expect(productActionButton).toHaveText('Add to cart');
        await expect(cartPage.cartBadge).toHaveCount(0);
    });
});