import { LitElement, html } from 'lit';
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

	private _fpsInterval?: number;
	private _animationCallback = () => this._animateSphere();

	// No shadow DOM - use global styles
	createRenderRoot() {
		return this;
	}

	connectedCallback() {
		super.connectedCallback();
		this._startFpsCounter();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._stopFpsCounter();
		if (this._isAnimating) {
			this.scene?.unregisterBeforeRender(this._animationCallback);
		}
	}

	render() {
		return html`
			<aside class="panel" role="complementary" aria-label="Control Panel">
				<h2>🎮 Control Panel</h2>

				<section class="info" aria-label="Performance Information">
					<div>FPS: <span class="fps">${this._fps}</span></div>
				</section>

				<section class="control-group">
					<fieldset>
						<legend class="control-label">Sphere Color</legend>
						<div class="button-group" role="group" aria-label="Color selection">
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
					</fieldset>
				</section>

				<section class="control-group">
					<fieldset>
						<legend class="control-label">Camera</legend>
						<ui-button
							label="Reset Camera"
							@button-click=${this._resetCamera}
						></ui-button>
					</fieldset>
				</section>

				<section class="control-group">
					<fieldset>
						<legend class="control-label">Animation</legend>
						<ui-button
							label=${this._isAnimating ? 'Stop Animation' : 'Start Animation'}
							@button-click=${this._toggleAnimation}
						></ui-button>
					</fieldset>
				</section>
			</aside>
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
			this.scene?.registerBeforeRender(this._animationCallback);
		} else {
			this.scene?.unregisterBeforeRender(this._animationCallback);
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
