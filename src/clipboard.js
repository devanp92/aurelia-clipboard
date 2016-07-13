/**
	This is a clipboard alternative to ZeroClipboard which removes a dependency that requires Flash (Flash is dead).
	document.execCommand is ~86% supported across all browsers (http://caniuse.com/#feat=document-execcommand)
	It creates an empty textarea element and sets the inner text to the text to copy (since the browser can only copy from inputs and textareas).
	Usage:
		<require from="customattributes/clipboard"></require>
		<span>${name}</span>
		...
		<button clipboard="${name}">COPY ME</button>
**/
import {inject, bindable} from 'aurelia-framework';

// Create faux-textArea element
const createFauxTextAreaElement = (text) => {
	const tempTextAreaElement = document.createElement('textarea');

	// Ensure that the element is able to be selected/focused (precautionary)
	tempTextAreaElement.display = 'none';
	tempTextAreaElement.style.background = 'transparent';
	tempTextAreaElement.style.border = 'none';
	tempTextAreaElement.style.boxShadow = 'none';
	tempTextAreaElement.style.height = '2em';
	tempTextAreaElement.style.left = 0;
	tempTextAreaElement.style.outline = 'none';
	tempTextAreaElement.style.padding = 0;
	tempTextAreaElement.style.position = 'fixed';
	tempTextAreaElement.style.top = 0;
	tempTextAreaElement.style.width = '2em';

	tempTextAreaElement.innerText = text;

	return tempTextAreaElement;
}

@inject(Element)
export class ClipboardCustomAttribute {
	constructor(element) {
		this.element = element;

		this.element.addEventListener('click', this.clickEventListener);
	}

	clickEventListener() {
		// Ensure that copy is supported by browser and text is not null
		if (document.queryCommandSupported('copy') && this.element.text) {
			const tempTextAreaElement = createFauxTextAreaElement(this.element.text);

			document.body.appendChild(tempTextAreaElement);

			tempTextAreaElement.select();

			document.execCommand('SelectAll');
			document.execCommand('Copy');

			// Cleanup
			document.body.removeChild(tempTextAreaElement);
		}
	}

	valueChanged(newVal) {
		this.element.text = newVal;
	}
}
