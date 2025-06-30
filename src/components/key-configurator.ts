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
  return html`<slot></slot>`;
}

export const KeyConfigurator = component(KeyConfiguratorComponent, {
  useShadowDOM: true,
});
