# aurelia-clipboard
Aurelia custom attribute for using browser's clipboard api

## Getting Started

This custom attribute uses ```document.execCommand``` which is [~86% supported across all browsers](http://caniuse.com/#feat=document-execcommand). It creates an empty textarea element, sets the innerText to the text you want to copy, then removes the element.

## Installation

To install, simply run `npm install aurelia-clipboard`.

## Usage

```html
<require from="XXX/clipboard"></require>
<span>${name}</span>
<i class="fa fa-clipboard" clipboard="${name}"></i>
```

In `main.js`, add the plugin to the exported `aurelia` function:

```
export function configure(aurelia) {
    aurelia.use
      .standardConfiguration()
      .developmentLogging()
      .plugin('aurelia-clipboard');

    ...
}
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/devanp92/aurelia-clipboard/blob/master/LICENSE) file for details
