import { expect } from "chai";
import "../index";

describe("<key-value>", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = "";
  });

  it("loads value from localStorage", async () => {
    localStorage.setItem("test-ns", JSON.stringify({ FOO: "bar" }));
    document.body.innerHTML =
      '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value>baz</key-value></key-pair></key-configurator>';
    const value = document.querySelector("key-value");
    if (!value) throw new Error("key-value not found");
    await new Promise((r) => setTimeout(r, 20));
    const input = value.shadowRoot?.querySelector("input");
    expect(input?.value).to.equal("bar");
  });

  it("loads value from textContent if not in localStorage", async () => {
    document.body.innerHTML =
      '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value>baz</key-value></key-pair></key-configurator>';
    const value = document.querySelector("key-value");
    if (!value) throw new Error("key-value not found");
    await new Promise((r) => setTimeout(r, 20));
    const input = value.shadowRoot?.querySelector("input");
    expect(input?.value).to.equal("baz");
  });

  it("shows placeholder if no value", async () => {
    document.body.innerHTML =
      '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value></key-value></key-pair></key-configurator>';
    const value = document.querySelector("key-value");
    if (!value) throw new Error("key-value not found");
    await new Promise((r) => setTimeout(r, 20));
    const input = value.shadowRoot?.querySelector("input");
    expect(input?.getAttribute("placeholder")).to.equal("no token defined");
  });
});
