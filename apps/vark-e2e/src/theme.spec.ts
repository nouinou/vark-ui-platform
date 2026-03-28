import { test, expect } from '@playwright/test';
import { THEME_STORAGE_KEY } from '@vark/ui-theme';

test('Theme switch changes UI (light/dark)', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');
  const preview = page.getByTestId('tokens-preview');

  // Start: switch to dark
  await page.getByTestId('btn-theme-dark').click();
  await expect(html).toHaveAttribute('data-theme', 'dark');

  const bgDark = await preview.evaluate((el) => getComputedStyle(el).backgroundImage);

  // Switch to light
  await page.getByTestId('btn-theme-light').click();
  await expect(html).toHaveAttribute('data-theme', 'light');

  const bgLight = await preview.evaluate((el) => getComputedStyle(el).backgroundImage);

  // Assert a real visual change happened.
  expect(bgDark).not.toBe(bgLight);
});

test('system mode can be selected', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('btn-theme-system').click();

  const stored = await page.evaluate(
    (storageKey) => window.localStorage.getItem(storageKey),
    THEME_STORAGE_KEY,
  );
  expect(stored).toBe('system');
});
