import { component, html, useState, useEffect } from "haunted";

const INFO_TEXT = `
<b>Key Configurator</b> is a web component for securely and conveniently managing configuration keys.
<ul>
  <li>Click <span class="info-icon">
    <svg class="info-svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .66.42 1.25 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09c-.66 0-1.25.42-1.51 1z"/></svg>
  </span> to view and edit your configuration keys.</li>
  <li>Click <span class="info-icon">
    <svg class="info-svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
  </span> to view this help panel.</li>
  <li>Values are saved in <code>localStorage</code> under the component's <b>id</b> namespace.</li>
  <li>When you edit and leave a field, the value is updated automatically.</li>
  <li>If you clear a value, the key is removed from storage.</li>
</ul>
`;

function initializeLocalStorageIfNeeded(host: HTMLElement) {
  if (!localStorage.getItem(host.id)) {
    const pairs = Array.from(host.querySelectorAll("key-pair"));
    const obj: Record<string, string> = {};
    pairs.forEach((pair) => {
      const name = pair.querySelector("key-name")?.textContent?.trim();
      const value = pair.querySelector("key-value")?.textContent?.trim();
      if (name && value) {
        obj[name] = value;
      }
    });
    if (Object.keys(obj).length > 0) {
      localStorage.setItem(host.id, JSON.stringify(obj));
    }
  }
}

function addClickOutsideListener(
  host: HTMLElement,
  setPanel: (v: string) => void
) {
  function handleClickOutside(e: MouseEvent) {
    if (!host.contains(e.target as Node)) {
      setPanel("");
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}

function initializeConfigurator(
  host: HTMLElement,
  setPanel: (v: string) => void
) {
  if (!host.id) {
    throw new Error("<key-configurator> requires a non-empty id attribute.");
  }
  const panelKey = `${host.id}:panel`;
  const saved = localStorage.getItem(panelKey);
  if (saved === "config" || saved === "info") {
    setPanel(saved);
  } else {
    setPanel("");
  }
  initializeLocalStorageIfNeeded(host);
  return addClickOutsideListener(host, setPanel);
}

function KeyConfiguratorComponent(this: HTMLElement) {
  const [panel, setPanel] = useState("config"); // 'config' | 'info' | ''

  // Restore panel state from localStorage
  useEffect(() => {
    return initializeConfigurator(this, setPanel);
  }, [this.id]);

  // Persist panel state
  useEffect(() => {
    if (this.id) {
      if (!panel) {
        localStorage.removeItem(`${this.id}:panel`);
      } else {
        localStorage.setItem(`${this.id}:panel`, panel);
      }
    }
  }, [panel, this.id]);

  function showConfig() {
    setPanel(panel === "config" ? "" : "config");
  }
  function showInfo() {
    setPanel(panel === "info" ? "" : "info");
  }

  return html`
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
      :host {
        display: block;
        border: 1px solid #ccc;
        border-radius: 1.1em;
        padding: 1em;
        padding-top: 1.4em;
        width: 100%;
        font-family: "Inter", "Segoe UI", "Roboto", Arial, sans-serif;
        margin: 2em 0;
        position: relative;
        box-sizing: border-box;
        background: #fff;
        min-height: calc(3.5em + 12px);
      }
      .scope-label {
        position: absolute;
        top: 0;
        left: 0.75em;
        transform: translateY(-50%);
        background: #fff;
        padding: 0 0.5em;
        font-size: 0.85em;
        color: #888;
        font-family: monospace;
        pointer-events: none;
        line-height: 1;
      }
      .top-btns {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        display: flex;
        gap: 0.5em;
        z-index: 2;
      }
      .icon-btn {
        background: #f7f7fa;
        border: 1px solid #d1d5db;
        cursor: pointer;
        font-size: 1.3em;
        color: #888;
        width: 2.2em;
        height: 2.2em;
        padding: 0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s, color 0.2s, border-color 0.2s;
        outline: none;
      }
      .icon-btn.active,
      .icon-btn:focus {
        background: #eaf3ff;
        color: #007aff;
        border-color: #007aff;
      }
      .panel {
        margin-top: 0.5em;
        transition: max-height 0.3s cubic-bezier(0.4, 2, 0.6, 1), opacity 0.3s,
          margin-top 0.3s;
        overflow: hidden;
        max-height: 0;
        opacity: 0;
      }
      .panel.open {
        max-height: 1000px;
        opacity: 1;
        margin-top: calc(2.5em + 8px);
      }
      .info-content {
        padding: 1em;
        color: #333;
        font-size: 1em;
        background: #f7f7fa;
        border-radius: 0.7em;
        border: 1px solid #e0e0e0;
        font-family: "Inter", "Segoe UI", "Roboto", Arial, sans-serif;
        box-sizing: border-box;
      }
      .info-content ul {
        line-height: 1.9;
        margin: 1.1em 0 0 0;
        padding-left: 1.2em;
      }
      .info-content li {
        margin-bottom: 0.2em;
      }
      .info-content svg {
      }
      .info-icon {
        vertical-align: middle;
        display: inline-block;
        height: 1em;
        width: 1em;
        line-height: 1;
      }
      .info-svg {
        vertical-align: middle;
        display: inline-block;
        height: 1em;
        width: 1em;
        line-height: 1;
        position: relative;
        top: -2px;
      }
      ::slotted(key-pair) {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1em;
        margin-bottom: 1em;
        align-items: center;
      }
    </style>
    <div class="top-btns">
      <button
        class="icon-btn${panel === "info" ? " active" : ""}"
        aria-label="Información"
        @click=${showInfo}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="8" />
        </svg>
      </button>
      <button
        class="icon-btn${panel === "config" ? " active" : ""}"
        aria-label="Mostrar configuración"
        @click=${showConfig}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .66.42 1.25 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09c-.66 0-1.25.42-1.51 1z"
          />
        </svg>
      </button>
    </div>
    <span class="scope-label">Scope: ${this.id}</span>
    <div class="panel${panel === "config" ? " open" : ""}">
      <slot></slot>
    </div>
    <div class="panel${panel === "info" ? " open" : ""}">
      <div class="info-content">
        <div .innerHTML=${INFO_TEXT}></div>
      </div>
    </div>
  `;
}

export const KeyConfigurator = component(KeyConfiguratorComponent, {
  useShadowDOM: true,
});
