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
import { autoinject } from 'aurelia-framework';

@autoinject
export class ClipboardCustomAttribute {
	constructor(private element: Element) { }

	attached() {
		// Loop over any child elements and disable the click events. For example if you put this on a button,
		// and then put a span / image icon it breaks the click event.
		Array.from(this.element.childNodes).forEach(e => {
			const style = (<HTMLElement>e).style;
			if (style) {
				style.pointerEvents = 'none';
			}
		});

		this.element.addEventListener('click', this.handleClick);
	}

	detached() {
		this.element.removeEventListener('click', this.handleClick);
	}

	private handleClick($event: Event) {
		const text = $event.srcElement.getAttribute('text');
		if (document.queryCommandSupported('copy') && text) {
			const hiddenElement: HTMLTextAreaElement = document.createElement('textarea');
			hiddenElement.style.display = 'none !important;';
			hiddenElement.innerText = text;

			document.body.appendChild(hiddenElement);
			hiddenElement.select();

			document.execCommand('SelectAll');
			document.execCommand('Copy');

			document.body.removeChild(hiddenElement);
		}
	}

	private valueChanged(newValue: string) {
		this.element.setAttribute('text', newValue);
	}
}
