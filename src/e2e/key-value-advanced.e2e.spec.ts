import { test, expect } from "@playwright/test";

const EXAMPLES_URL = "http://localhost:5173/examples/index.html";

// Utility to access localStorage from Playwright
type Page = import("@playwright/test").Page;
async function getLocalStorage(
  page: Page,
  key: string
): Promise<string | null> {
  return await page.evaluate((k: string) => localStorage.getItem(k), key);
}

test.describe("<key-value> Advanced E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXAMPLES_URL);
    await expect(page.locator("key-configurator").first()).toBeVisible();
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear());
  });

  test("edits value, persists to localStorage, and clears value", async ({
    page,
  }) => {
    const configurator = page.locator("key-configurator").first();
    const keyPair = configurator.locator("key-pair").first();
    const keyName = keyPair.locator("key-name");
    const keyValue = keyPair.locator("key-value");
    const input = keyValue.locator('input[type="text"]');

    // Write a value and blur
    await input.fill("my-secret-token");
    await input.blur();
    // Check that the value remains in the input
    expect(await input.inputValue()).toBe("my-secret-token");

    // Check that the value is in localStorage under the configurator's id
    const ns = await configurator.getAttribute("id");
    const ls = await getLocalStorage(page, ns || "");
    expect(ls && ls.includes("my-secret-token")).toBeTruthy();

    // Clear the value and blur
    await input.fill("");
    await input.blur();
    expect(await input.inputValue()).toBe("");
    // Check that the key is removed from localStorage
    const lsAfter = await getLocalStorage(page, ns || "");
    expect(
      lsAfter === null || (lsAfter && !lsAfter.includes("my-secret-token"))
    ).toBeTruthy();
  });
});
