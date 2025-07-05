import { component, html } from "haunted";
import type { ComponentConstructor } from "haunted/lib/component";

function KeyPairComponent(this: HTMLElement) {
  return html`<slot></slot>`;
}

export type KeyPairType = ComponentConstructor<{}>;
export const KeyPair: KeyPairType = component(KeyPairComponent);
