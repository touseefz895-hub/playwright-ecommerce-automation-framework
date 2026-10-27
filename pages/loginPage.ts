import { Page , Locator } from  '@playwright/test';


export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

   constructor(page: Page) {
    this.page = page;
    this.userName = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', {name: 'Login'});
    this.errorMessage = page.locator('[data-test="error"]');

   }
   async navigateToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
   }

   async fillUsername(username: string) {
    await this.userName.fill(username);
   }

    async fillPassword(password: string) {
        await this.password.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

}