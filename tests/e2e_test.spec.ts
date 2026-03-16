import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { faker } from '@faker-js/faker';

const user = process.env.USER_STANDARD as string;
const userLocked = process.env.USER_LOCKED as string;
const password = process.env.USER_PASSWORD as string;

test(`Positive Case - Verify User be able to Purchase Items`, async ({ page }) => {

    const backpackPrice = '$29.99' as string;
    const bikelightPrice = '$9.99' as string;

    await test.step('1. Login Successfully', async () => {
      const loginPage = new LoginPage(page);
      // Login
      await loginPage.navigate();
      await loginPage.login(user, password);
      await loginPage.assertLoginSuccess();
    });

    await test.step('2. Add Products to Cart', async () => {
      const homePage = new HomePage(page);
      const cartPage = new CartPage(page);
      // Select & Add Products
      await homePage.selectProducts(backpackPrice, bikelightPrice);
      // Checkout Products from Cart
      await cartPage.checkoutCart(backpackPrice, bikelightPrice);
    });

    await test.step('3. Calculate and Checkout Products', async () => {
      const checkoutPage = new CheckoutPage(page);

      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const postalCode = faker.location.zipCode();
      // Input Checkout Information
      await checkoutPage.checkoutInformation(firstName, lastName, postalCode);
      // Calculate & Checkout Products from Cart
      await checkoutPage.checkout(backpackPrice, bikelightPrice);
      await checkoutPage.assertCheckoutSuccess();
    });

  });

test(`Negative Case - Verify User should not be able Login with Empty or Invalid User`, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('1. Login with Empty Field', async () => {
      // Login
      await loginPage.navigate();
      await loginPage.login('', '');
      await loginPage.assertLoginEmpty();
    });

    await test.step('2. Login with Invalid User Credential', async () => {
      // Login
      await loginPage.navigate();
      await loginPage.login('Test', password);
      await loginPage.assertLoginFailed();
    });

    await test.step('3. Login with Locked Out User', async () => {
      // Login
      await loginPage.navigate();
      await loginPage.login(userLocked, password);
      await loginPage.assertLoginLockedUser();
    });

  });

test(`Negative Case - Verify User should not be able Checkout with Empty User Information`, async ({ page }) => {

    await test.step('1. Login Successfully', async () => {
      const loginPage = new LoginPage(page);
      // Login
      await loginPage.navigate();
      await loginPage.login(user, password);
      await loginPage.assertLoginSuccess();
    });

    await test.step('2. Add Products to Cart', async () => {
      const homePage = new HomePage(page);
      const cartPage = new CartPage(page);

      const backpackPrice = '$29.99' as string;
      const bikelightPrice = '$9.99' as string;
      // Select & Add Products
      await homePage.selectProducts(backpackPrice, bikelightPrice);
      // Checkout Products from Cart
      await cartPage.checkoutCart(backpackPrice, bikelightPrice);
    });

    await test.step('3. Checkout with Empty User Information', async () => {
      const checkoutPage = new CheckoutPage(page);
      // Empty Checkout Information
      await checkoutPage.checkoutInformation('', '', '');
      await checkoutPage.assertEmptyInformation();
    });

  });