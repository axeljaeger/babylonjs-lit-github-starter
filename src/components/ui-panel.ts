import type { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { Scene } from '@babylonjs/core/scene';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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

				<a 
					href="https://github.com/axeljaeger/babylonjs-lit-github-starter" 
					target="_blank" 
					rel="noopener noreferrer"
					class="repo-link"
					aria-label="View source code on GitHub"
				>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
						<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
					</svg>
					View on GitHub
				</a>
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
