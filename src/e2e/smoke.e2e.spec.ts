import { test, expect } from '@playwright/test';

const EXAMPLES_URL = 'http://localhost:5173/examples/index.html';

test.describe('Smoke E2E', () => {
  test('page loads and main components are present', async ({ page }) => {
    await page.goto(EXAMPLES_URL);
    await expect(page.locator('key-configurator').first()).toBeVisible();
    await expect(page.locator('key-pair').first()).toBeVisible();
    await expect(page.locator('key-name').first()).toBeVisible();
    await expect(page.locator('key-value').first()).toBeVisible();
  });
});
