import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async checkoutInformation(firstName: string, lastName: string, postalCode: string) {
    await expect(this.page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async checkout(backpackPrice: string, bikelightPrice: string) {
    await expect(this.page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
    await expect(this.page.getByText('Sauce Labs Backpackcarry.')).toBeVisible();
    await expect(this.page.locator('[data-test="cart-list"]')).toContainText(backpackPrice);
    await expect(this.page.getByText('Sauce Labs Bike LightA red')).toBeVisible();
    await expect(this.page.locator('[data-test="cart-list"]')).toContainText(bikelightPrice);
    //calculate
    const backpack = parseFloat(backpackPrice.replace('$', ''));
    const bikelight = parseFloat(bikelightPrice.replace('$', ''));
    const itemTotal = backpack + bikelight;
    const tax = Number((itemTotal * 0.08).toFixed(2));
    const total = itemTotal + tax;
    await expect(this.page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $'+itemTotal);
    await expect(this.page.locator('[data-test="tax-label"]')).toContainText('Tax: $'+tax);
    await expect(this.page.locator('[data-test="total-label"]')).toContainText('Total: $'+total);
    await this.page.locator('[data-test="finish"]').click();
  }
  
  async assertCheckoutSuccess() {
    await expect(this.page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');
    await expect(this.page.locator('[data-test="pony-express"]')).toBeVisible();
    await expect(this.page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
    await expect(this.page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await this.page.locator('[data-test="back-to-products"]').click();
    await expect(this.page).toHaveURL('/inventory.html');
  }

  async assertEmptyInformation() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
    await expect(this.page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
  }
}
