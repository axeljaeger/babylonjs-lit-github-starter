import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-button')
export class UiButton extends LitElement {
	@property({ type: String }) label = 'Button';
	@property({ type: Boolean }) disabled = false;

	// No shadow DOM - use global styles
	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<button @click=${this._handleClick} ?disabled=${this.disabled}>
				${this.label}
			</button>
		`;
	}

	private _handleClick(e: Event) {
		this.dispatchEvent(
			new CustomEvent('button-click', {
				detail: { originalEvent: e },
				bubbles: true,
				composed: true,
			}),
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-button': UiButton;
	}
}
