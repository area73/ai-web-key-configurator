import { KeyConfigurator } from "./components/key-configurator";
import { KeyPair } from "./components/key-pair";
import { KeyName } from "./components/key-name";
import { KeyValue } from "./components/key-value";

// Register custom elements in a side-effect-safe way
if (!customElements.get("key-configurator")) {
  customElements.define("key-configurator", KeyConfigurator);
}
if (!customElements.get("key-pair")) {
  customElements.define("key-pair", KeyPair);
}
if (!customElements.get("key-name")) {
  customElements.define("key-name", KeyName);
}
if (!customElements.get("key-value")) {
  customElements.define("key-value", KeyValue);
}

export { KeyConfigurator, KeyPair, KeyName, KeyValue };
