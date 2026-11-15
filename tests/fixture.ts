import {test as base, expect, Page} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage'; 
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';  
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';   
import { CartPage } from '../pages/cartPage'; 



type Fixture = {
    authenticatedPage: Page;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    productDetailPage: ProductDetailsPage;
    checkoutCompletePage: CheckoutCompletePage;
    checkoutInformationPage: CheckoutInformationPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    cartPage: CartPage;
};

export const test = base.extend<Fixture>({
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user' , 'secret_sauce');

       await use(page);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    productDetailPage: async ({page}, use) => {
    const productDetailPage = new ProductDetailsPage(page);
    await use(productDetailPage);
    },
   
    checkoutCompletePage: async ({page}, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    },

    checkoutInformationPage: async ({page}, use) => {
        const checkoutInformationPage = new CheckoutInformationPage(page);
        await use(checkoutInformationPage);
    },

    checkoutOverviewPage: async ({page}, use) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    },

    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }


});



export { expect };
