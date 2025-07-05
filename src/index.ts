import { KeyConfigurator } from "./components/key-configurator.js";
import type { KeyConfiguratorType } from "./components/key-configurator.js";
import { KeyPair } from "./components/key-pair.js";
import type { KeyPairType } from "./components/key-pair.js";
import { KeyName } from "./components/key-name.js";
import type { KeyNameType } from "./components/key-name.js";
import { KeyValue } from "./components/key-value.js";
import type { KeyValueType } from "./components/key-value.js";

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

export {
  KeyConfigurator,
  KeyConfiguratorType,
  KeyPair,
  KeyPairType,
  KeyName,
  KeyNameType,
  KeyValue,
  KeyValueType,
};
