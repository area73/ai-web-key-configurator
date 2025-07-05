import { test, expect } from '@playwright/test';

// Adjust this URL if your dev server runs on a different port or path
const EXAMPLES_URL = 'http://localhost:5173/examples/index.html';

test.describe('<key-configurator> E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXAMPLES_URL);
    await expect(page.locator('key-configurator')).toBeVisible();
  });

  test('renders and toggles panels robustly', async ({ page }) => {
    const configurator = page.locator('key-configurator').first();
    const infoBtn = configurator.locator('.icon-btn').nth(0);
    const configBtn = configurator.locator('.icon-btn').nth(1);
    const configPanel = configurator.locator('.panel').nth(0);
    const infoPanel = configurator.locator('.panel').nth(1);

    // Ensure both panels are closed at the start
    await expect(configPanel).not.toHaveClass(/open/);
    await expect(infoPanel).not.toHaveClass(/open/);

    // Click config to open it
    await configBtn.click();
    await expect(configPanel).toHaveClass(/open/);
    await expect(infoPanel).not.toHaveClass(/open/);

    // Click info to open it and close config
    await infoBtn.click();
    await expect(infoPanel).toHaveClass(/open/);
    await expect(configPanel).not.toHaveClass(/open/);

    // Click config to open it and close info
    await configBtn.click();
    await expect(configPanel).toHaveClass(/open/);
    await expect(infoPanel).not.toHaveClass(/open/);

    // Click config again to close both
    await configBtn.click();
    await expect(configPanel).not.toHaveClass(/open/);
    await expect(infoPanel).not.toHaveClass(/open/);
  });

  test('shows slot content', async ({ page }) => {
    const configurator = page.locator('key-configurator').first();
    const keyPair = configurator.locator('key-pair').first();
    await expect(keyPair).toBeVisible();
    await expect(keyPair.locator('key-name')).toHaveText(/OPEN-API-KEY|FOO/); // Adjust to your real example
    await expect(keyPair.locator('key-value')).toBeVisible();
  });
});
