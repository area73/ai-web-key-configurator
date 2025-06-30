import { component, html, useState, useEffect } from "haunted";

function getKeyName(el: HTMLElement): string | null {
  const pair = el.closest("key-pair");
  if (!pair) return null;
  const name = pair.querySelector("key-name");
  return name?.textContent?.trim() || null;
}

function getNamespace(el: HTMLElement): string | null {
  const configurator = el.closest("key-configurator");
  return configurator?.id || null;
}

function KeyValueComponent(this: HTMLElement) {
  const [value, setValue] = useState("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    const ns = getNamespace(this);
    const key = getKeyName(this);
    let v = "";
    if (ns && key) {
      v = localStorage.getItem(`${ns}:${key}`) || "";
    }
    if (!v) {
      v = this.textContent?.trim() || "";
    }
    setValue(v);
    setInitialized(true);
  }, [initialized]);

  function onInput(e: Event) {
    setValue((e.target as HTMLInputElement).value);
  }

  function onBlur() {
    const ns = getNamespace(this);
    const key = getKeyName(this);
    if (ns && key) {
      localStorage.setItem(`${ns}:${key}`, value);
    }
  }

  const placeholder = value ? "" : "no token defined";

  return html`<input
    type="text"
    .value=${value}
    @input=${onInput}
    @blur=${onBlur}
    placeholder=${placeholder}
  />`;
}

export const KeyValue = component(KeyValueComponent, { useShadowDOM: true });
