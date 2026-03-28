import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('app-header')).toBeVisible();
  await expect(page.getByTestId('theme-switcher')).toBeVisible();
  await expect(page.getByTestId('tokens-preview')).toBeVisible();

  await expect(page.getByTestId('btn-theme-system')).toBeVisible();
  await expect(page.getByTestId('btn-theme-light')).toBeVisible();
  await expect(page.getByTestId('btn-theme-dark')).toBeVisible();

  await expect(page.getByTestId('tokens-grid')).toBeVisible();
});
