import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async selectProducts(backpackPrice: string, bikelightPrice: string) {
    await expect(this.page.locator('[data-test="inventory-list"]')).toContainText(backpackPrice);
    await expect(this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(this.page.locator('[data-test="remove-sauce-labs-backpack"]')).toContainText('Remove');
    await expect(this.page.locator('[data-test="inventory-list"]')).toContainText(bikelightPrice);
    await expect(this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
    await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(this.page.locator('[data-test="remove-sauce-labs-bike-light"]')).toContainText('Remove');
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}

