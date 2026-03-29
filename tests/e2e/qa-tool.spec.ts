import { test, expect } from '@playwright/test';

// Skip this test automatically when running in CI
test.skip(process.env.CI === 'true', 'Skipping Claude‑triggering test in CI');

test('QA Tool - main user journey', async ({ page }) => {
  await page.goto('https://engmilo.github.io/qa-tool/');

  // Wait for UI to be ready
  const descriptionTextarea = page.getByPlaceholder(/Example: As a manager/i);
  await expect(descriptionTextarea).toBeVisible();

  const featureText = `As a manager, I want to understand my colleagues' progress so I can better report our success and failures.`;

  await descriptionTextarea.fill(featureText);

  // Correct assertion for textarea
  await expect(descriptionTextarea).toHaveValue(/As a manager/);

  const projectNameInput = page.getByPlaceholder(/e\.g\. Login Feature/i);
  await expect(projectNameInput).toBeVisible();
  await projectNameInput.fill('Progress Dashboard');

  const generateBtn = page.locator('#generate-btn');

  // Ensure button is interactable
  await expect(generateBtn).toBeEnabled();
  await generateBtn.click();

  const cards = page.locator('.tc-card');

  // Wait for results
  await expect(cards.first()).toBeVisible({ timeout: 30000 });

  const firstCard = cards.first();
  await expect(firstCard.locator('.steps-list')).toBeVisible();
  await expect(firstCard.locator('.expected')).toBeVisible();
  await expect(firstCard.locator('.badge')).toBeVisible();

  const stats = page.locator('#stats');
  await expect(stats).toContainText(/Total cases/i);
});
