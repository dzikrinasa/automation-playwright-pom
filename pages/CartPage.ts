import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async checkoutCart(backpackPrice: string, bikelightPrice: string) {
    await expect(this.page.locator('[data-test="title"]')).toContainText('Your Cart');
    await expect(this.page.getByText('1Sauce Labs Backpackcarry.')).toBeVisible();
    await expect(this.page.locator('[data-test="cart-list"]')).toContainText(backpackPrice);
    await expect(this.page.getByText('1Sauce Labs Bike LightA red')).toBeVisible();
    await expect(this.page.locator('[data-test="cart-list"]')).toContainText(bikelightPrice);
    await this.page.locator('[data-test="checkout"]').click();
  }
}

