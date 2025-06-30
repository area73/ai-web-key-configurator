import { component, html } from "haunted";

function KeyPairComponent(this: HTMLElement) {
  return html`<slot></slot>`;
}

export const KeyPair = component(KeyPairComponent);
