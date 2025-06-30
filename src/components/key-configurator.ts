import { component, html } from "haunted";
import { useEffect } from "haunted";

function KeyConfiguratorComponent(this: HTMLElement) {
  useEffect(() => {
    if (!this.id) {
      throw new Error("<key-configurator> requires a non-empty id attribute.");
    }
  }, [this.id]);
  return html`<slot></slot>`;
}

export const KeyConfigurator = component(KeyConfiguratorComponent, {
  useShadowDOM: true,
});
