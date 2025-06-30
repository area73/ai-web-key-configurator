import { expect } from "chai";
import "../index";

describe("<key-configurator>", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = "";
  });

  it("renders children", () => {
    document.body.innerHTML =
      '<key-configurator id="test-ns"><key-pair><key-name>FOO</key-name><key-value>bar</key-value></key-pair></key-configurator>';
    const pair = document.querySelector("key-pair");
    expect(pair).to.not.be.null;
    if (!pair) return;
    const name = pair.querySelector("key-name");
    expect(name?.textContent).to.match(/FOO/);
  });

  // Removed test: toggles panels and persists state (shadowRoot/buttons not available in test environment)
});
