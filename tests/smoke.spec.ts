import { test, expect } from '@playwright/test';

const APP_URL = 'https://engmilo.github.io/qa-tool/';

test.beforeEach(async ({ page }) => {
  await page.goto(APP_URL);
});

test('page loads with correct title', async ({ page }) => {
  await expect(page).toHaveTitle(/AI Test Case Generator/i);
});

test('Generate button is visible', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Generate test cases' })).toBeVisible();
});

test('main tabs are visible', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Projects' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Coverage' })).toBeVisible();
});

test('description textarea is visible', async ({ page }) => {
  await expect(page.getByPlaceholder(/Example: As a manager/i)).toBeVisible();
});

test('example prompt buttons are visible', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Manager Progress Report' })).toBeVisible();
});
