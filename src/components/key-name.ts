import { component, html } from "haunted";

function KeyNameComponent(this: HTMLElement) {
  return html`
    <style>
      :host {
        font-weight: bold;
        width: auto;
      }
    </style>
    <span>${this.textContent}</span>
  `;
}

export const KeyName = component(KeyNameComponent);
