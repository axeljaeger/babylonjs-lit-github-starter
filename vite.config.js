import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
	base: '/babylonjs-lit-github-starter/',
	server: {
		host: true,
		port: 3000,
		strictPort: true,
	},
	build: {
		chunkSizeWarningLimit: 1600,
		rolldownOptions: {
			output: {
				codeSplitting:
					mode === 'analyze'
						? undefined
						: {
								groups: [
									{
										name: 'babylonjs',
										test: /node_modules\/@babylonjs\/core/,
									},
									{
										name: 'lit',
										test: /node_modules\/(?:lit|lit-html|lit-element|@lit)\//,
									},
								],
							},
			},
		},
		// Show detailed chunk information in analyze mode
		reportCompressedSize: mode === 'analyze',
	},
}));
