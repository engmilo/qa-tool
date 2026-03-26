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

  // Wait for generation to complete (button re-enables when done)
  await expect(page.locator('#generate-btn')).not.toBeDisabled({ timeout: 30000 });

  // Verify test cases rendered
  const cards = page.locator('.tc-card');
  await expect(cards).not.toHaveCount(0); // at least one card

  // Validate card structure
  const firstCard = cards.first();
  await expect(firstCard.locator('.steps-list')).toBeVisible();
  await expect(firstCard.locator('.expected')).toBeVisible();
  await expect(firstCard.locator('.badge')).toBeVisible();

  // Validate stats updated
  const stats = page.locator('#stats');
  await expect(stats).toContainText(/Total cases/i);
});
