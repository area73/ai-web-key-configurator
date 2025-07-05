import { component, html } from "haunted";

function KeyNameComponent(this: HTMLElement) {
  return html`
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
      :host {
        font-weight: 500;
        font-family: "Inter", "Segoe UI", "Roboto", Arial, sans-serif;
        background: #f7f7fa;
        color: #333;
        border-radius: 0.7em;
        padding: 0.5em 0.9em;
        font-size: 1em;
        display: inline-block;
        letter-spacing: 0.01em;
        box-sizing: border-box;
      }
    </style>
    <span>${this.textContent}</span>
  `;
}

export type KeyNameType = new (...args: any[]) => HTMLElement;
export const KeyName: KeyNameType = component(KeyNameComponent);
