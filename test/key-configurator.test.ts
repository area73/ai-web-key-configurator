/// <reference types="mocha" />
import { describe, beforeEach, it, expect } from "vitest";
import "../src/index";

describe("<key-configurator>", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = "";
  });

  it("throws if id is missing", () => {
    expect(() => {
      const el = document.createElement("key-configurator");
      document.body.appendChild(el);
    }).toThrow();
  });

  it("renders children", () => {
    document.body.innerHTML =
      '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value>bar</key-value></key-pair></key-configurator>';
    const pair = document.querySelector("key-pair");
    expect(pair).not.toBeNull();
    const name = pair!.shadowRoot
      ? pair!.shadowRoot.textContent
      : pair!.textContent;
    expect(name).toMatch(/FOO/);
  });

  it("loads value from localStorage if present", async () => {
    localStorage.setItem("test-ns:FOO", "baz");
    document.body.innerHTML =
      '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value>bar</key-value></key-pair></key-configurator>';
    const value = document.querySelector("key-value");
    await new Promise((r) => setTimeout(r, 10));
    const input = value!.shadowRoot!.querySelector("input")!;
    expect((input as HTMLInputElement).value).toBe("baz");
  });

  it("loads value from textContent if not in localStorage", async () => {
    document.body.innerHTML =
      '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value>bar</key-value></key-pair></key-configurator>';
    const value = document.querySelector("key-value");
    await new Promise((r) => setTimeout(r, 10));
    const input = value!.shadowRoot!.querySelector("input")!;
    expect((input as HTMLInputElement).value).toBe("bar");
  });

  it("shows placeholder if no value", async () => {
    document.body.innerHTML =
      '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value></key-value></key-pair></key-configurator>';
    const value = document.querySelector("key-value");
    await new Promise((r) => setTimeout(r, 10));
    const input = value!.shadowRoot!.querySelector("input")!;
    expect(input.getAttribute("placeholder")).toBe("no token defined");
  });

  it("saves value to localStorage on blur", async () => {
    document.body.innerHTML =
      '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value></key-value></key-pair></key-configurator>';
    const value = document.querySelector("key-value");
    await new Promise((r) => setTimeout(r, 10));
    const input = value!.shadowRoot!.querySelector("input")!;
    input.value = "newtoken";
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new Event("blur"));
    expect(localStorage.getItem("test-ns:FOO")).toBe("newtoken");
  });
});
