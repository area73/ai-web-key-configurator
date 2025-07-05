import { test, expect } from '@playwright/test';

const EXAMPLES_URL = 'http://localhost:5173/examples/index.html';

test.describe('<key-pair> E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXAMPLES_URL);
    await expect(page.locator('key-pair').first()).toBeVisible();
  });

  test('renders slot content', async ({ page }) => {
    const keyPair = page.locator('key-pair').first();
    await expect(keyPair.locator('key-name')).toBeVisible();
    await expect(keyPair.locator('key-value')).toBeVisible();
  });
});
