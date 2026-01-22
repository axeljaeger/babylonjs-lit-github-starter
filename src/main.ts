import './style.css';
import './components.css';
import './components/ui-panel';

import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import type { UiPanel } from './components/ui-panel';

// Get the canvas element
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

// Generate the BABYLON 3D engine
const engine = new Engine(canvas, true);

// Create scene
const createScene = () => {
	// Creates a basic Babylon Scene object
	const scene = new Scene(engine);

	// Creates and positions a free camera
	const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

	// Targets the camera to scene origin
	camera.setTarget(Vector3.Zero());

	// This attaches the camera to the canvas
	camera.attachControl(canvas, true);

	// Creates a light, aiming 0,1,0 - to the sky
	const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

	// Dim the light a small amount - 0 to 1
	light.intensity = 0.7;

	// Built-in 'sphere' shape.
	const sphere = CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);

	// Create material for the sphere
	const sphereMaterial = new StandardMaterial('sphereMaterial', scene);
	sphereMaterial.diffuseColor = new Color3(0.4, 0.6, 1);
	sphere.material = sphereMaterial;

	// Move the sphere upward 1/2 its height
	sphere.position.y = 1;

	// Built-in 'ground' shape.
	CreateGround('ground', { width: 6, height: 6 }, scene);

	return { scene, camera, sphere };
};

// Call the createScene function
const { scene, camera, sphere } = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(() => {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener('resize', () => {
	engine.resize();
});

// Connect the UI panel to the scene
const uiPanel = document.getElementById('control-panel') as unknown as UiPanel;
if (uiPanel) {
	uiPanel.scene = scene;
	uiPanel.sphere = sphere;
	uiPanel.camera = camera;
}
