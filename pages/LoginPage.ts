import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await expect(this.page.getByText('Swag Labs')).toBeVisible();
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.page.locator('[data-test="title"]')).toContainText('Products');
  }

  async assertLoginFailed() {
    await expect(this.page).not.toHaveURL('/inventory.html');
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
    await expect(this.page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  }

  async assertLoginEmpty() {
    await expect(this.page).not.toHaveURL('/inventory.html');
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
    await expect(this.page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
  }

  async assertLoginLockedUser() {
    await expect(this.page).not.toHaveURL('/inventory.html');
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
    await expect(this.page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  }
}

