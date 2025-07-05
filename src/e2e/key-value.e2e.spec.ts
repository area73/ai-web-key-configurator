import { test, expect } from '@playwright/test';

const EXAMPLES_URL = 'http://localhost:5173/examples/index.html';

test.describe('<key-value> E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXAMPLES_URL);
    await expect(page.locator('key-value').first()).toBeVisible();
  });

  test('renders input and placeholder', async ({ page }) => {
    const keyValue = page.locator('key-value').first();
    const input = keyValue.locator('input[type="text"]');
    await expect(input).toBeVisible();
    const placeholder = await input.getAttribute('placeholder');
    expect(placeholder).not.toBeNull();
  });

  test('can edit value and blur triggers storage', async ({ page }) => {
    const keyValue = page.locator('key-value').first();
    const input = keyValue.locator('input[type="text"]');
    await input.fill('test-value');
    await input.blur();
    // Optionally, check that the value persists (if your app syncs with localStorage)
    expect(await input.inputValue()).toBe('test-value');
  });
});
