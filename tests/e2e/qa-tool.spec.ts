import { test, expect } from '@playwright/test';

test('QA Tool - main user journey', async ({ page }) => {
  // Navigate to the app
  await page.goto('https://engmilo.github.io/qa-tool/'); // adjust if needed

  // Locate the textarea
  const descriptionTextarea = page.getByPlaceholder(/Example: As a manager/i);

  // Instead of relying on auto-filled text, fill it yourself
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

  // Click Generate
  const generateButton = page.getByRole('button', { name: /generate/i });
  await generateButton.click();

  // Wait for loading spinner to disappear
  const spinner = page.locator('#loading-spinner');
  await spinner.waitFor({ state: 'hidden', timeout: 15000 });

  // Verify test cases rendered
  const cards = page.locator('.test-case-card');
  await expect(cards).toHaveCountGreaterThan(0);

  // Validate at least one card has expected structure
  await expect(cards.first().locator('.steps')).toBeVisible();
  await expect(cards.first().locator('.expected')).toBeVisible();
  await expect(cards.first().locator('.priority')).toBeVisible();

  // Optional: verify stats updated
  const stats = page.locator('#stats');
  await expect(stats).toContainText(/Total:/i);
});
