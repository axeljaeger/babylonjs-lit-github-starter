import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-button')
export class UiButton extends LitElement {
	@property({ type: String }) label = 'Button';
	@property({ type: Boolean }) disabled = false;

	static styles = css`
		:host {
			display: inline-block;
		}

		button {
			padding: 10px 20px;
			font-size: 14px;
			font-weight: 500;
			color: white;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			border: none;
			border-radius: 6px;
			cursor: pointer;
			transition: all 0.3s ease;
			box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
			font-family: inherit;
		}

		button:hover:not(:disabled) {
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
		}

		button:active:not(:disabled) {
			transform: translateY(0);
		}

		button:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	`;

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
			})
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-button': UiButton;
	}
}
