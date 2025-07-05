import { expect } from "chai";
import "../index";
import {
  getKeyName,
  getNamespace,
  loadValueFromStorage,
  saveValueToStorage,
} from "./key-value.js";

// Unified helper for test setup
function setupTest() {
  localStorage.clear();
  document.body.innerHTML = "";
}

// Unified configurator creation helper
function createConfigurator({
  id = "test-ns",
  key = "FOO",
  value = "",
  asHTML = false,
} = {}) {
  if (asHTML) {
    const html = `<key-configurator id="${id}"><key-pair><key-name>${key}</key-name><key-value>${value}</key-value></key-pair></key-configurator>`;
    document.body.innerHTML = html;
    return {
      configurator: document.querySelector("key-configurator"),
      pair: document.querySelector("key-pair"),
      name: document.querySelector("key-name"),
      keyValue: document.querySelector("key-value"),
    };
  }

  const conf = document.createElement("key-configurator");
  conf.id = id;
  const pair = document.createElement("key-pair");
  const name = document.createElement("key-name");
  name.textContent = key;
  pair.appendChild(name);
  const keyValue = document.createElement("key-value");
  keyValue.textContent = value;
  pair.appendChild(keyValue);
  conf.appendChild(pair);
  document.body.appendChild(conf);
  return { configurator: conf, pair, name, keyValue };
}

// Helper to get key-value element and input with error handling
async function getKeyValueInput(selector = "key-value", waitMs = 20) {
  const value = document.querySelector(selector);
  if (!value) throw new Error("key-value not found");
  await new Promise((r) => setTimeout(r, waitMs));
  const input = value.shadowRoot?.querySelector("input");
  if (!input) throw new Error("input not found");
  return { element: value, input };
}

// Helper for common test configurator setup
function setupTestConfigurator(options = {}) {
  return createConfigurator({ ...options, asHTML: true });
}

// Helper for input/blur event simulation
async function simulateInputBlur(
  input: HTMLInputElement,
  value: string,
  waitMs = 100
) {
  input.value = value;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("blur", { bubbles: true }));
  await new Promise((r) => setTimeout(r, waitMs));
}

// Helper for localStorage assertions
function expectLocalStorageToContain(key: string, expectedValue: string) {
  const stored = localStorage.getItem(key);
  expect(stored).to.be.a("string").and.include(expectedValue);
}

function expectLocalStorageKeyRemoved(key: string, removedKey: string) {
  const stored = localStorage.getItem(key);
  if (stored) {
    const obj = JSON.parse(stored);
    expect(obj[removedKey] === "" || !obj.hasOwnProperty(removedKey)).to.be
      .true;
  } else {
    expect(stored).to.be.null;
  }
}

describe("<key-value>", () => {
  beforeEach(setupTest);

  it("loads value from localStorage", async () => {
    localStorage.setItem("test-ns", JSON.stringify({ FOO: "bar" }));
    setupTestConfigurator({ value: "baz" });
    const { input } = await getKeyValueInput();
    expect(input.value).to.equal("bar");
  });

  it("loads value from textContent if not in localStorage", async () => {
    setupTestConfigurator({ value: "baz" });
    const { input } = await getKeyValueInput();
    expect(input.value).to.equal("baz");
  });

  it("shows placeholder if no value", async () => {
    setupTestConfigurator();
    const { input } = await getKeyValueInput();
    expect(input.getAttribute("placeholder")).to.equal("no token defined");
  });
});

describe("key-value helpers", () => {
  let el: HTMLElement;
  beforeEach(() => {
    setupTest();
    el = document.createElement("div");
  });

  it("getKeyName returns null if not in key-pair", () => {
    expect(getKeyName(el)).to.equal(null);
  });

  it("getKeyName returns null if no key-name child", () => {
    const pair = document.createElement("key-pair");
    el.appendChild(pair);
    expect(getKeyName(pair as HTMLElement)).to.equal(null);
  });

  it("getNamespace returns null if not in key-configurator", () => {
    expect(getNamespace(el)).to.equal(null);
  });

  it("loadValueFromStorage returns textContent if localStorage has invalid JSON", () => {
    localStorage.setItem("ns", "{bad json");
    const { keyValue } = createConfigurator({ id: "ns" });
    expect(loadValueFromStorage(keyValue as HTMLElement)).to.equal("");
  });

  it('loadValueFromStorage returns "" if no value in storage or textContent', () => {
    const { keyValue } = createConfigurator({ id: "ns" });
    expect(loadValueFromStorage(keyValue as HTMLElement)).to.equal("");
  });

  it("saveValueToStorage removes key if value is empty and object is empty", () => {
    localStorage.setItem("ns", JSON.stringify({ FOO: "bar" }));
    const { pair } = createConfigurator({ id: "ns" });
    saveValueToStorage(pair as HTMLElement, "");
    expect(localStorage.getItem("ns")).to.be.null;
  });

  it("saveValueToStorage does nothing if no key or namespace", () => {
    let el = document.createElement("div");
    saveValueToStorage(el, "value");
    expect(localStorage.length).to.equal(0);
  });

  it("saveValueToStorage overwrites if localStorage has invalid JSON", () => {
    localStorage.setItem("ns", "{bad json");
    const { pair } = createConfigurator({ id: "ns" });
    saveValueToStorage(pair as HTMLElement, "baz");
    expectLocalStorageToContain("ns", "baz");
  });
});

describe("<key-value> input/blur lifecycle", () => {
  beforeEach(setupTest);

  // NOTE: These tests are skipped because Haunted component lifecycle and event handlers
  // don't work properly in JSDOM. They are covered in Playwright E2E tests instead.
  it.skip("input event updates value, blur persists to localStorage", async () => {
    setupTestConfigurator();
    const { input } = await getKeyValueInput("key-value", 100);
    await simulateInputBlur(input, "secret");
    expectLocalStorageToContain("test-ns", "secret");
  });

  it.skip("clearing value and blur removes key from localStorage", async () => {
    localStorage.setItem("test-ns", JSON.stringify({ FOO: "bar" }));
    setupTestConfigurator();
    const { input } = await getKeyValueInput("key-value", 100);
    await simulateInputBlur(input, "");
    expectLocalStorageKeyRemoved("test-ns", "FOO");
  });
});
