# babylonjs-lit-github-starter

A modern starter template combining BabylonJS for 3D rendering with Google's Lit for reactive HTML-based UI components.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=axeljaeger/babylonjs-lit-github-starter)

## Features

- 🎮 **BabylonJS 3D Rendering** - Powerful 3D engine with tree-shakeable imports
- ⚡ **Lit Components** - Lightweight, fast web components for UI
- 🚀 **Vite** - Lightning-fast development and optimized production builds
- 📘 **TypeScript** - Full type safety and IntelliSense support
- 🎨 **Modern UI** - Styled overlay components that interact with the 3D scene
- 🔧 **Biome** - Fast formatting and linting
- 📦 **GitHub Pages Ready** - Automatic deployment workflow included

## What's Included

This starter demonstrates:
- Full-screen 3D canvas with BabylonJS
- Interactive Lit UI components overlaying the 3D scene
- Control panel with buttons to manipulate the scene
- FPS counter
- Sphere color changing
- Camera reset functionality
- Animation toggle
- Proper TypeScript typing throughout
- Shadow DOM encapsulation for components

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Use this template** to create a new repository (or clone it):
   ```bash
   git clone https://github.com/axeljaeger/babylonjs-lit-github-starter.git
   cd babylonjs-lit-github-starter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Development Commands

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build for production
- `npm run build:analyze` - Build with detailed bundle size analysis
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## Project Structure

```
babylonjs-lit-github-starter/
├── src/
│   ├── components/
│   │   ├── ui-button.ts      # Reusable Lit button component
│   │   └── ui-panel.ts       # Main control panel component
│   ├── main.ts               # Entry point - BabylonJS + Lit initialization
│   ├── style.css             # Global styles
│   └── vite-env.d.ts         # Vite type definitions
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.js            # Vite configuration
└── biome.json               # Biome configuration
```

## How It Works

### BabylonJS Scene

The 3D scene is initialized in `src/main.ts` and includes:
- A FreeCamera for navigation
- HemisphericLight for illumination
- A textured sphere
- A ground plane

### Lit Components

UI components are built with Lit and include:

1. **ui-button.ts** - A reusable styled button component
2. **ui-panel.ts** - A control panel with multiple interactive features

The components communicate with the BabylonJS scene through property bindings and event handlers.

### Integration

The Lit components receive references to the BabylonJS scene objects (scene, camera, sphere) as properties, allowing them to directly manipulate the 3D scene.

## Deployment to GitHub Pages

The repository includes a GitHub Actions workflow that automatically builds and deploys your project to GitHub Pages on every push.

### Setup

1. Go to your repository **Settings** → **Pages**
2. Under "Source", select **GitHub Actions**
3. Push to your main branch, and the workflow will automatically deploy

The workflow file is located at `.github/workflows/deploy.yml`

## Customization

### Adopting the Template

If you plan to publish to npm:
1. Update the `name` field in `package.json`
2. Update repository URLs in `package.json`
3. Update the title in `index.html`

### Adding More Components

Create new Lit components in `src/components/`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-component')
export class MyComponent extends LitElement {
  @property({ type: String }) name = 'World';

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<div>Hello, ${this.name}!</div>`;
  }
}
```

## Automatic Dependency Upgrades

The repository is prepared to use [Dependabot](https://github.com/dependabot) for automatic dependency updates. Enable it in your repository settings to keep dependencies up to date.

## Technologies Used

- [BabylonJS](https://www.babylonjs.com/) - 3D rendering engine
- [Lit](https://lit.dev/) - Web components framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Biome](https://biomejs.dev/) - Linting and formatting

## Related Work

- [babylonjs-vite-ts-github-starter](https://github.com/axeljaeger/babylonjs-vite-ts-github-starter) - BabylonJS + Vite + TypeScript
- [babylonjs-angular-github-starter](https://github.com/axeljaeger/babylonjs-angular-github-starter) - BabylonJS + Angular
- [BabylonJS Playground](https://playground.babylonjs.com/) - Online BabylonJS editor

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.