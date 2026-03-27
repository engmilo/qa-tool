import { test, expect } from '@playwright/test';

test('QA Tool - main user journey', async ({ page }) => {
  await page.goto('https://engmilo.github.io/qa-tool/');
  await page.waitForLoadState('networkidle');

  const descriptionTextarea = page.getByPlaceholder(/Example: As a manager/i);

  const featureText = `As a manager, I want to understand my colleagues' progress so I can better report our success and failures.`;

  await descriptionTextarea.fill(featureText);
  await expect(descriptionTextarea).toContainText('As a manager');

  const projectNameInput = page.getByPlaceholder(/e\.g\. Login Feature/i);
  await projectNameInput.fill('Progress Dashboard');

  await page.locator('#generate-btn').click();

  const cards = page.locator('.tc-card');

  // Stronger, reliable assertion
  await expect(cards.first()).toBeVisible({ timeout: 30000 });

  const firstCard = cards.first();
  await expect(firstCard.locator('.steps-list')).toBeVisible();
  await expect(firstCard.locator('.expected')).toBeVisible();
  await expect(firstCard.locator('.badge')).toBeVisible();

  const stats = page.locator('#stats');
  await expect(stats).toContainText(/Total cases/i);
});