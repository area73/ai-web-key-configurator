import { component, html, useState, useEffect } from "haunted";

function getKeyName(el: HTMLElement): string | null {
  const pair = el.closest("key-pair");
  console.log("[key-value][getKeyName] this:", el, "found pair:", pair);
  if (!pair) return null;
  const name = pair.querySelector("key-name");
  console.log(
    "[key-value][getKeyName] found name:",
    name,
    "text:",
    name?.textContent
  );
  return name?.textContent?.trim() || null;
}

function getNamespace(el: HTMLElement): string | null {
  const configurator = el.closest("key-configurator");
  console.log(
    "[key-value][getNamespace] this:",
    el,
    "found configurator:",
    configurator,
    "id:",
    configurator?.id
  );
  return configurator?.id || null;
}

function KeyValueComponent(this: HTMLElement) {
  const host = this;
  const [value, setValue] = useState("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    const ns = getNamespace(host);
    const key = getKeyName(host);
    let v = "";
    if (ns && key) {
      const obj = localStorage.getItem(ns);
      if (obj) {
        try {
          const parsed = JSON.parse(obj);
          v = parsed[key] || "";
        } catch {}
      }
    }
    if (!v) {
      v = host.textContent?.trim() || "";
    }
    setValue(v);
    setInitialized(true);
  }, [initialized]);

  function onInput(e: Event) {
    setValue((e.target as HTMLInputElement).value);
  }

  function onBlur(host: HTMLElement, e: Event) {
    const ns = getNamespace(host);
    const key = getKeyName(host);
    if (ns && key) {
      const obj = localStorage.getItem(ns);
      let parsed: Record<string, string> = {};
      if (obj) {
        try {
          parsed = JSON.parse(obj);
        } catch {}
      }
      if (value) {
        parsed[key] = value;
        console.log(`[key-value] Set ${key} = '${value}' in namespace '${ns}'`);
      } else {
        delete parsed[key];
        console.log(`[key-value] Deleted key '${key}' from namespace '${ns}'`);
      }
      if (Object.keys(parsed).length > 0) {
        localStorage.setItem(ns, JSON.stringify(parsed));
        console.log(`[key-value] Updated localStorage['${ns}']:`, parsed);
      } else {
        localStorage.removeItem(ns);
        console.log(
          `[key-value] Removed localStorage['${ns}'] (object is empty)`
        );
      }
    } else {
      console.log("[key-value] No namespace or key found for onBlur", {
        ns,
        key,
      });
    }
  }

  const placeholder = value ? "" : "no token defined";

  return html`<input
    type="text"
    .value=${value}
    @input=${onInput}
    @blur=${(e: Event) => onBlur(host, e)}
    placeholder=${placeholder}
  />`;
}

export const KeyValue = component(KeyValueComponent);
