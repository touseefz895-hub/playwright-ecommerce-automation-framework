
import {test, expect} from './fixture';
import {loginData} from '../test-data/loginTestData';

test('AUTH-001: Verify user can log in with valid credentials', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(loginPage.page).toHaveURL(/inventory\.html$/);
});

for (const testData of loginData) {
    test(`${testData.testCaseId}: ${testData.title}`, async ({loginPage}) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(testData.username, testData.password);
        await expect(loginPage.errorMessage).toHaveText(testData.expectedErrorMessage);
    });
}