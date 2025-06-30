import { component, html } from "haunted";

function KeyNameComponent(this: HTMLElement) {
  return html`<span>${this.textContent}</span>`;
}

export const KeyName = component(KeyNameComponent);
