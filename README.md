# ai-web-key-configurator

A simple web component library to configure environment keys, built with [Haunted](https://github.com/matthewp/haunted) and TypeScript. Distributed as a native Web Component for easy integration.

## Usage

Install via npm (after publishing):

```sh
npm install ai-web-key-configurator
```

Import and use in your HTML/JS:

```js
import "ai-web-key-configurator";
```

Add the component to your HTML:

```html
<key-configurator id="namespace">
  <key-pair>
    <key-name>OPEN-API-KEY</key-name>
    <key-value>aJ44564kdsj.LkkdSS-wshjs</key-value>
  </key-pair>
</key-configurator>
```

- The `id` attribute is required and is used as the localStorage namespace.
- Each `<key-pair>` can have a `<key-name>` (static) and an optional `<key-value>` (editable input).
