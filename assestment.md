# Assestment

We want to use a web component library that will be served as a NPM package.
This package will have a web component called `<key-configuratior>`
The `<key-configurator>` will have this structure:
`<key-configurator id="namespace-of-local-storage">
  <key-pair>
    <key-name>OPEN-API-KEY</key-name>
    <key-value>aJ44564kdsj.LkkdSS-wshjs</key-value>
  </key-pair>
</key-configurator>`
The id is mandatory and cannot be empty. This id will be used to store the values under localstorage under a namespace named as in id
There could be more than one `<key-pair>`
Inside `<key-pair>` , `<key-value>`can be optional

Each key pair will render as:
`<key-name>` as string , cannot be changed
`<key-value>` as an input. The value can be changed and it is retrieved first from the localstorage if it is defined under the namespace. If empty then try to use the value on the web component if none of these live it blank adn add a placeholder to the input with the value "no token defined". If we get focus on any if these inputs, we can edit the content and after loosing focus the value will be update on the local storage.
