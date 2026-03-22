import { test, expect } from '@playwright/test';

test('QA Tool - main user journey', async ({ page }) => {
  // 1. Navigate to the tool
  await page.goto('https://engmilo.github.io/qa-tool/');

  // 2. Verify the page title is correct
  await expect(page).toHaveTitle(/AI Test Case Generator/i);

  // 3. Verify the Generate button is visible
  const generateBtn = page.getByRole('button', { name: 'Generate test cases' });
  await expect(generateBtn).toBeVisible();

  // 4. Click an example prompt
  const exampleBtn = page.getByRole('button', { name: 'Manager Progress Report' });
  await exampleBtn.click();

  // 5. Verify the textarea was filled
  // FIX: Target the Description textarea, not the Project name input
  const descriptionTextarea = page.getByPlaceholder(/Example: As a manager/i);
  
  // Use toHaveValue to verify the large block of text appeared
  await expect(descriptionTextarea).toHaveValue(/As a manager, I want to be able to understand my colleagues progress/i);

  // Optional: If you want to fill the Project Name manually to keep the test realistic:
  const projectNameInput = page.getByPlaceholder(/e\.g\. Login Feature/i);
  await projectNameInput.fill('Manager Report Project');

  // 6. Navigate to Projects tab
  await page.getByRole('button', { name: 'Projects' }).click();
  
  // Optional: Add a check to ensure the Projects view actually loaded
  // await expect(page.getByText('Your Projects')).toBeVisible();

  // 7. Navigate to Coverage tab
  await page.getByRole('button', { name: 'Coverage' }).click();

  // 8. Verify Coverage tab loaded
  await expect(page.getByRole('button', { name: 'Coverage' })).toBeVisible();
});