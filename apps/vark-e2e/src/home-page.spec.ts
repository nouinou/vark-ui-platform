import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('header')).toBeVisible();
  await expect(page.getByLabel('Theme switcher')).toBeVisible();
  await expect(page.getByLabel('Tokens preview')).toBeVisible();
});
