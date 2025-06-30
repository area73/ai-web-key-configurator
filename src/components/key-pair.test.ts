import { expect } from "chai";
import "../index";

describe("<key-pair>", () => {
  it("renders slot content", () => {
    document.body.innerHTML =
      '<key-pair><span id="test-span">Hello</span></key-pair>';
    const pair = document.querySelector("key-pair");
    expect(pair).to.not.be.null;
    if (!pair) return;
    expect(pair.querySelector("#test-span")?.textContent).to.equal("Hello");
  });
});
