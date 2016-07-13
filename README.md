# aurelia-clipboard
Aurelia custom attribute for using browser's clipboard api

This custom attribute uses ```document.execCommand``` which is [~86% supported across all browsers]((http://caniuse.com/#feat=document-execcommand)). It creates an empty textarea element, sets the innerText to the text you want to copy, then removes the element.

## Usage

```html
<require from="XXX/clipboard"></require>
<span>${name}</span>
<i class="fa fa-clipboard" clipboard="${name}"></i>
```
