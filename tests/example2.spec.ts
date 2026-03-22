


import { test, expect } from '@playwright/test';

test('homepage loads and button works', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);

  // Find and click the More information link
  await page.locator('text=More information').click();

  // Check the new page URL includes 'iana'
  await expect(page).toHaveURL(/iana/);
});