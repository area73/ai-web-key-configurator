import { component, html } from "haunted";
import { useEffect } from "haunted";

function KeyConfiguratorComponent(this: HTMLElement) {
  useEffect(() => {
    if (!this.id) {
      throw new Error("<key-configurator> requires a non-empty id attribute.");
    }
    // Only set if not already present
    if (!localStorage.getItem(this.id)) {
      const pairs = Array.from(this.querySelectorAll("key-pair"));
      const obj: Record<string, string> = {};
      pairs.forEach((pair) => {
        const name = pair.querySelector("key-name")?.textContent?.trim();
        const value = pair.querySelector("key-value")?.textContent?.trim();
        if (name && value) {
          obj[name] = value;
        }
      });
      if (Object.keys(obj).length > 0) {
        localStorage.setItem(this.id, JSON.stringify(obj));
      }
    }
  }, [this.id]);
  return html`
    <style>
      :host {
        display: block;
        border: 1px solid #ccc;
        padding: 1em;
        padding-top: 1.4em;
        width: 100%;
        font-family: sans-serif;
        margin: 2em 0;
        position: relative;
        box-sizing: border-box;
      }
      .scope-label {
        position: absolute;
        top: 0;
        left: 0.75em;
        transform: translateY(-50%);
        background: #fff;
        padding: 0 0.5em;
        font-size: 0.85em;
        color: #888;
        font-family: monospace;
        pointer-events: none;
        line-height: 1;
      }
      ::slotted(key-pair) {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1em;
        margin-bottom: 1em;
        align-items: center;
      }
    </style>
    <span class="scope-label">Scope: ${this.id}</span>
    <slot></slot>
  `;
}

export const KeyConfigurator = component(KeyConfiguratorComponent, {
  useShadowDOM: true,
});
