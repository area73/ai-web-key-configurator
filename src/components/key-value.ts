import { component, html, useState, useEffect } from "haunted";
import type { ComponentConstructor } from "haunted/lib/component";

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

function loadValueFromStorage(host: HTMLElement): string {
  const ns = getNamespace(host);
  const key = getKeyName(host);
  if (ns && key) {
    const obj = localStorage.getItem(ns);
    if (obj) {
      try {
        const parsed = JSON.parse(obj);
        return parsed[key] || "";
      } catch {}
    }
  }
  return host.textContent?.trim() || "";
}

function saveValueToStorage(host: HTMLElement, value: string) {
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
    } else {
      delete parsed[key];
    }
    if (Object.keys(parsed).length > 0) {
      localStorage.setItem(ns, JSON.stringify(parsed));
    } else {
      localStorage.removeItem(ns);
    }
  }
}

function KeyValueComponent(this: HTMLElement) {
  const host = this;
  const [value, setValue] = useState("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    setValue(loadValueFromStorage(host));
    setInitialized(true);
  }, [initialized]);

  function onInput(e: Event) {
    setValue((e.target as HTMLInputElement).value);
  }

  function onBlur(host: HTMLElement, e: Event) {
    saveValueToStorage(host, value);
  }

  const placeholder = value ? "" : "no token defined";

  return html`
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
      :host {
        width: 100%;
      }
      input[type="text"] {
        width: 100%;
        padding: 0.5em 0.9em;
        font-size: 1em;
        font-family: "Inter", "Segoe UI", "Roboto", Arial, sans-serif;
        border: 1px solid #d1d5db;
        border-radius: 0.7em;
        background: #f7f7fa;
        color: #222;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.2s, background 0.2s;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
      input[type="text"]:focus {
        border-color: #007aff;
        background: #fff;
      }
      input[type="text"]::placeholder {
        color: #b0b0b0;
        opacity: 1;
        font-weight: 400;
      }
    </style>
    <input
      type="text"
      .value=${value}
      @input=${onInput}
      @blur=${(e: Event) => onBlur(host, e)}
      placeholder=${placeholder}
    />
  `;
}

export type KeyValueType = ComponentConstructor<{}>;
export const KeyValue: KeyValueType = component(KeyValueComponent);
