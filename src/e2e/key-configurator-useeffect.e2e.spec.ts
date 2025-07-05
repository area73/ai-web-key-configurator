import { test, expect } from "@playwright/test";
import { Page } from "@playwright/test";

const EXAMPLES_URL = "http://localhost:5173/examples/index.html";

async function getPanelStateFromStorage(
  page: Page,
  id: string
): Promise<string | null> {
  return await page.evaluate(
    (panelKey: string) => localStorage.getItem(panelKey),
    `${id}:panel`
  );
}

test.describe("<key-configurator> useEffect coverage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXAMPLES_URL);
    await page.evaluate(() => localStorage.clear());
  });

  test("restores and persists panel state on id and panel change", async ({
    page,
  }) => {
    // Mount a configurator with id 'e2e-ns'
    await page.evaluate(() => {
      const el = document.createElement("key-configurator");
      el.id = "e2e-ns";
      document.body.appendChild(el);
    });
    const configurator = page.locator("key-configurator#e2e-ns");
    await expect(configurator).toBeVisible();

    // Simulate toggling the info panel
    await page.evaluate(() => {
      const el = document.querySelector(
        "key-configurator#e2e-ns"
      ) as HTMLElement | null;
      if (el && el.shadowRoot) {
        const btn = el.shadowRoot.querySelectorAll(".icon-btn")[0] as
          | HTMLButtonElement
          | undefined;
        btn?.click();
      }
    });
    // Panel state should be 'info' in localStorage
    await expect
      .poll(async () => getPanelStateFromStorage(page, "e2e-ns"))
      .toBe("info");

    // Remove the old configurator and add a new one with the new id
    await page.evaluate(() => {
      const oldEl = document.querySelector("key-configurator#e2e-ns");
      if (oldEl) oldEl.remove();
      const newEl = document.createElement("key-configurator");
      newEl.id = "e2e-ns2";
      document.body.appendChild(newEl);
    });
    await page.waitForSelector("key-configurator#e2e-ns2");
    // Panel state should be null initially for new id
    await expect
      .poll(async () => getPanelStateFromStorage(page, "e2e-ns2"))
      .toBe(null);

    // Toggle info panel for new id to persist state
    await page.evaluate(() => {
      const el = document.querySelector(
        "key-configurator#e2e-ns2"
      ) as HTMLElement | null;
      if (el && el.shadowRoot) {
        const btn = el.shadowRoot.querySelectorAll(".icon-btn")[0] as
          | HTMLButtonElement
          | undefined;
        btn?.click();
      }
    });
    await expect
      .poll(async () => getPanelStateFromStorage(page, "e2e-ns2"))
      .toBe("info");
  });
});
