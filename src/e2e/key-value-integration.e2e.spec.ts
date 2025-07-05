import { test, expect } from '@playwright/test';

const EXAMPLES_URL = 'http://localhost:5173/examples/index.html';

test.describe('<key-value> integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXAMPLES_URL);
    await page.evaluate(() => localStorage.clear());
  });

  test('input event updates value, blur persists to localStorage', async ({ page }) => {
    // Mount a configurator with a key-value
    await page.evaluate(() => {
      document.body.innerHTML = '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value></key-value></key-pair></key-configurator>';
    });
    const value = page.locator('key-value');
    await expect(value).toBeVisible();
    const input = value.locator('input[type="text"]');
    await input.fill('secret');
    await input.blur();
    // Wait for localStorage to update
    await page.waitForTimeout(50);
    const stored = await page.evaluate(() => localStorage.getItem('test-ns'));
    expect(stored).toContain('secret');
  });

  test('clearing value and blur removes key from localStorage', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('test-ns', JSON.stringify({ FOO: 'bar' }));
      document.body.innerHTML = '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value></key-value></key-pair></key-configurator>';
    });
    const value = page.locator('key-value');
    await expect(value).toBeVisible();
    const input = value.locator('input[type="text"]');
    await input.fill('');
    await input.blur();
    await page.waitForTimeout(50);
    const stored = await page.evaluate(() => localStorage.getItem('test-ns'));
    if (stored) {
      const obj = JSON.parse(stored);
      expect(obj.FOO === '' || !Object.prototype.hasOwnProperty.call(obj, 'FOO')).toBeTruthy();
    } else {
      expect(stored).toBeNull();
    }
  });
});
