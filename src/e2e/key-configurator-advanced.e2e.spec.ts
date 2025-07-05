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

test.describe("<key-configurator> Advanced E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXAMPLES_URL);
    await expect(page.locator("key-configurator").first()).toBeVisible();
    await page.evaluate(() => localStorage.clear());
  });

  test("persists panel state in localStorage when toggling", async ({
    page,
  }) => {
    const configurator = page.locator("key-configurator").first();
    const infoBtn = configurator.locator(".icon-btn").nth(0);
    const configBtn = configurator.locator(".icon-btn").nth(1);
    const ns = await configurator.getAttribute("id");

    // Abre info panel
    await infoBtn.click();
    let panelState = await getLocalStorage(page, ns + ":panel");
    expect(panelState).toBe("info");

    // Abre config panel
    await configBtn.click();
    panelState = await getLocalStorage(page, ns + ":panel");
    expect(panelState).toBe("config");

    // Cierra panel
    await configBtn.click();
    panelState = await getLocalStorage(page, ns + ":panel");
    expect(panelState === null || panelState === "").toBeTruthy();
  });

  test("edge case: initializes localStorage with key-pair children", async ({
    page,
  }) => {
    // Inyecta un configurator con key-pair
    await page.evaluate(() => {
      const el = document.createElement("key-configurator");
      el.id = "init-ns-e2e";
      el.innerHTML =
        "<key-pair><key-name>FOO</key-name><key-value>bar</key-value></key-pair>";
      document.body.appendChild(el);
    });
    const ns = "init-ns-e2e";
    // Espera a que el localStorage se inicialice
    await test.step("wait for localStorage to be set", async () => {
      for (let i = 0; i < 10; i++) {
        const ls = await getLocalStorage(page, ns);
        if (ls && ls.includes("FOO") && ls.includes("bar")) return;
        await page.waitForTimeout(100);
      }
      throw new Error("localStorage not initialized");
    });
    const ls = await getLocalStorage(page, ns);
    expect(ls).toContain("FOO");
    expect(ls).toContain("bar");
  });
});
