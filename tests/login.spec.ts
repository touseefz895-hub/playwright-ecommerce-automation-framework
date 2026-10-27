
import {test , expect } from  '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';


test('Verify user is able to login with valid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(productsPage.productTitle).toBeVisible();
});

test('Verify user is not able to login with invalid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login('invalid_user', 'invalid_password');
    await expect(loginPage.errorMessage).toContainText(
    'Epic sadface: Username and password do not match any user in this service');
});