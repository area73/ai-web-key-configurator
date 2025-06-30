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
        max-width: 400px;
        font-family: sans-serif;
        margin: 2em;
        position: relative;
        box-sizing: border-box;
      }
      .cope-label {
        position: absolute;
        top: 0;
        left: 1em;
        transform: translateY(-50%);
        background: #fff;
        padding: 0 0.5em;
        font-size: 0.85em;
        color: #888;
        font-family: monospace;
        pointer-events: none;
      }
      ::slotted(key-pair) {
        display: flex;
        align-items: center;
        margin-bottom: 1em;
      }
    </style>
    <span class="scope-label">Sope: ${this.id}</span>
    <slot></slot>
  `;
}

export const KeyConfigurator = component(KeyConfiguratorComponent, {
  useShadowDOM: true,
});
