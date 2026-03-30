import { test, expect } from '@playwright/test';

test('create ticket smoke flow', async ({ page }) => {
  await page.goto('/');

  // Open
  await page.getByTestId('btn-create-ticket').click();
  await expect(page.getByTestId('create-ticket-panel')).toBeVisible();

  // Fill minimal
  await page.getByTestId('input-ticket-title').fill('First ticket');
  await page.getByTestId('input-ticket-description').fill('Hello');

  // Create
  await page.getByTestId('btn-confirm-create-tickets').click();
  await expect(page.getByTestId('create-ticket-panel')).not.toBeVisible();

  // Ticket appears
  await expect(page.getByTestId('tickets-list')).toBeVisible();
  await expect(page.getByTestId('tickets-list')).toContainText('First ticket');
});

test('cancel create ticket closes panel', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('btn-create-ticket').click();
  await expect(page.getByTestId('create-ticket-panel')).toBeVisible();

  await page.getByTestId('btn-cancel-create-ticket').click();
  await expect(page.getByTestId('create-ticket-panel')).not.toBeVisible();
});
