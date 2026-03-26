import { test, expect } from '@playwright/test';

test('QA Tool - main user journey', async ({ page }) => {
  // Navigate to the app
  await page.goto('https://engmilo.github.io/qa-tool/');

  // Locate the textarea
  const descriptionTextarea = page.getByPlaceholder(/Example: As a manager/i);

  // Provide deterministic input
  const featureText = `
    As a manager, I want to understand my colleagues' progress
    so I can better report our success and failures.
  `.trim();

  await descriptionTextarea.fill(featureText);

  // Verify the textarea contains what we typed
  await expect(descriptionTextarea).toHaveValue(/As a manager/i);

  // Fill project name
  const projectNameInput = page.getByPlaceholder(/e\.g\. Login Feature/i);
  await projectNameInput.fill('Progress Dashboard');

  // Click the correct Generate button (avoid the tab)
  await page.locator('#generate-btn').click();

  // Wait for loading spinner to disappear
  const spinner = page.locator('#loading-spinner');
  await spinner.waitFor({ state: 'hidden', timeout: 15000 });

  // Verify test cases rendered
  const cards = page.locator('.test-case-card');
  await expect(cards).toHaveCountGreaterThan(0);

  // Validate card structure
  const firstCard = cards.first();
  await expect(firstCard.locator('.steps')).toBeVisible();
  await expect(firstCard.locator('.expected')).toBeVisible();
  await expect(firstCard.locator('.priority')).toBeVisible();

  // Validate stats updated
  const stats = page.locator('#stats');
  await expect(stats).toContainText(/Total:/i);
});
