import { expect } from "chai";
import "../index";

describe("<key-name>", () => {
  it("renders its text content", () => {
    document.body.innerHTML = "<key-name>API_KEY</key-name>";
    const el = document.querySelector("key-name");
    expect(el).to.not.be.null;
    if (!el) return;
    expect(el.textContent).to.equal("API_KEY");
  });
});
