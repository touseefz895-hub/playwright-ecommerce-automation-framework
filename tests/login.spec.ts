
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

const negativeLoginTestData = [
{
    testCaseId: 'AUTH-002',
    title: 'Verify user is not able to login with invalid credentials',
    username: 'invalid_user',
    password: 'invalid_password',
    expectedErrorMessage: 'Epic sadface: Username and password do not match any user in this service'   
    
 },

 {
    testCaseId: 'AUTH-003',
    title: 'Verify user is not able to login with empty username',
    username: '',
    password: 'secret_sauce',
    expectedErrorMessage: 'Epic sadface: Username is required'
 },
 {
    testCaseId: 'AUTH-004',
    title: 'Verify user is not able to login with empty password',
    username: 'standard_user',
    password: '',
    expectedErrorMessage: 'Epic sadface: Password is required'
 }
];

for (const testData of negativeLoginTestData) {
    test(`${testData.testCaseId}: ${testData.title}`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(testData.username, testData.password);
        await expect(loginPage.errorMessage).toHaveText(testData.expectedErrorMessage);
    });
}