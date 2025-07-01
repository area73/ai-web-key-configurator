# ai-web-key-configurator

A simple web component library to configure environment keys, built with [Haunted](https://github.com/matthewp/haunted) and TypeScript. Distributed as a native Web Component for easy integration.

## Usage

Install via npm (after publishing):

```sh
npm install @area73/ai-web-key-configurator
```

Import and use in your HTML/JS:

```js
import "@area73/ai-web-key-configurator";
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

## Alternative usage: direct import as a native module

If you don't want to use npm, you can copy the `dist/index.js` file from this package and load it directly in your HTML as a native ES module:

```html
<!-- Copy dist/index.js to your project and reference the correct path -->
<script type="module" src="./path/to/index.js"></script>
```

This will globally register the custom elements, and you can use them in your HTML:

```html
<key-configurator id="my-env">
  <key-pair>
    <key-name>API_KEY</key-name>
    <key-value>demo</key-value>
  </key-pair>
</key-configurator>
```
