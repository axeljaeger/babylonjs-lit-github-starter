import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Scene } from '@babylonjs/core/scene';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core/Maths/math.color';

@customElement('ui-panel')
export class UiPanel extends LitElement {
	@property({ type: Object }) scene?: Scene;
	@property({ type: Object }) sphere?: Mesh;
	@property({ type: Object }) camera?: FreeCamera;

	@state() private _fps = 0;

	private _fpsInterval?: number;

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
							<button @click=${() => this._changeSphereColor(1, 0, 0)}>
								Red
							</button>
							<button @click=${() => this._changeSphereColor(0, 1, 0)}>
								Green
							</button>
							<button @click=${() => this._changeSphereColor(0, 0, 1)}>
								Blue
							</button>
						</div>
					</fieldset>
				</section>

				<section class="control-group">
					<fieldset>
						<legend class="control-label">Camera</legend>
						<button @click=${this._resetCamera}>Reset Camera</button>
					</fieldset>
				</section>

				<section class="github-link-section">
					<a 
						href="https://github.com/axeljaeger/babylonjs-lit-github-starter" 
						target="_blank"
						rel="noopener noreferrer"
						class="github-link"
						aria-label="View source code on GitHub">
						🔗 GitHub Repository
					</a>
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
