import { test, expect } from '@playwright/test';

const EXAMPLES_URL = 'http://localhost:5173/examples/index.html';

test.describe('<key-name> E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXAMPLES_URL);
    await expect(page.locator('key-name').first()).toBeVisible();
  });

  test('renders its text content', async ({ page }) => {
    const keyName = page.locator('key-name').first();
    const text = await keyName.textContent();
    expect(text).not.toBeNull();
    expect(text?.trim().length).toBeGreaterThan(0);
  });
});
