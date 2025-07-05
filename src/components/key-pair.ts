import { component, html } from "haunted";

function KeyPairComponent(this: HTMLElement) {
  return html`<slot></slot>`;
}

export type KeyPairType = new (...args: any[]) => HTMLElement;
export const KeyPair: KeyPairType = component(KeyPairComponent);
