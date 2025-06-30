import { component, html } from "haunted";

function KeyNameComponent(this: HTMLElement) {
  return html`
    <style>
      :host {
        flex: 1;
        font-weight: bold;
      }
    </style>
    <span>${this.textContent}</span>
  `;
}

export const KeyName = component(KeyNameComponent);
