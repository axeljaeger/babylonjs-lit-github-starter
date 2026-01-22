import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Scene } from '@babylonjs/core/scene';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import './ui-button';

@customElement('ui-panel')
export class UiPanel extends LitElement {
	@property({ type: Object }) scene?: Scene;
	@property({ type: Object }) sphere?: Mesh;
	@property({ type: Object }) camera?: FreeCamera;

	@state() private _isAnimating = false;
	@state() private _fps = 0;

	private _animationId?: number;
	private _fpsInterval?: number;

	static styles = css`
		:host {
			display: block;
		}

		.panel {
			position: fixed;
			top: 20px;
			right: 20px;
			background: rgba(0, 0, 0, 0.85);
			backdrop-filter: blur(10px);
			border-radius: 12px;
			padding: 20px;
			min-width: 250px;
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
			color: white;
		}

		h2 {
			margin: 0 0 16px 0;
			font-size: 18px;
			font-weight: 600;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}

		.control-group {
			margin-bottom: 16px;
		}

		.control-group:last-child {
			margin-bottom: 0;
		}

		.control-label {
			display: block;
			margin-bottom: 8px;
			font-size: 12px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			opacity: 0.7;
		}

		.button-group {
			display: flex;
			gap: 8px;
			flex-wrap: wrap;
		}

		.info {
			font-size: 14px;
			padding: 10px;
			background: rgba(255, 255, 255, 0.1);
			border-radius: 6px;
			margin-bottom: 16px;
		}

		.fps {
			font-weight: 600;
			color: #4ade80;
		}
	`;

	connectedCallback() {
		super.connectedCallback();
		this._startFpsCounter();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._stopFpsCounter();
		if (this._animationId !== undefined) {
			this.scene?.unregisterBeforeRender(() => this._animateSphere());
		}
	}

	render() {
		return html`
			<div class="panel">
				<h2>🎮 Control Panel</h2>

				<div class="info">
					<div>FPS: <span class="fps">${this._fps}</span></div>
				</div>

				<div class="control-group">
					<div class="control-label">Sphere Color</div>
					<div class="button-group">
						<ui-button
							label="Red"
							@button-click=${() => this._changeSphereColor(1, 0, 0)}
						></ui-button>
						<ui-button
							label="Green"
							@button-click=${() => this._changeSphereColor(0, 1, 0)}
						></ui-button>
						<ui-button
							label="Blue"
							@button-click=${() => this._changeSphereColor(0, 0, 1)}
						></ui-button>
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">Camera</div>
					<ui-button
						label="Reset Camera"
						@button-click=${this._resetCamera}
					></ui-button>
				</div>

				<div class="control-group">
					<div class="control-label">Animation</div>
					<ui-button
						label=${this._isAnimating ? 'Stop Animation' : 'Start Animation'}
						@button-click=${this._toggleAnimation}
					></ui-button>
				</div>
			</div>
		`;
	}

	private _changeSphereColor(r: number, g: number, b: number) {
		if (this.sphere?.material) {
			const material = this.sphere.material as unknown as {
				diffuseColor?: Color3;
			};
			if (material.diffuseColor) {
				material.diffuseColor = new Color3(r, g, b);
			}
		}
	}

	private _resetCamera() {
		if (this.camera) {
			this.camera.position = new Vector3(0, 5, -10);
			this.camera.setTarget(Vector3.Zero());
		}
	}

	private _toggleAnimation() {
		this._isAnimating = !this._isAnimating;

		if (this._isAnimating) {
			this.scene?.registerBeforeRender(() => this._animateSphere());
		} else {
			this.scene?.unregisterBeforeRender(() => this._animateSphere());
		}
	}

	private _animateSphere() {
		if (this.sphere && this._isAnimating) {
			this.sphere.rotation.y += 0.02;
		}
	}

	private _startFpsCounter() {
		this._fpsInterval = window.setInterval(() => {
			if (this.scene) {
				this._fps = Math.round(this.scene.getEngine().getFps());
			}
		}, 1000);
	}

	private _stopFpsCounter() {
		if (this._fpsInterval !== undefined) {
			clearInterval(this._fpsInterval);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-panel': UiPanel;
	}
}
