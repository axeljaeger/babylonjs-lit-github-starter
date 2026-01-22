import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
	base: '/babylonjs-lit-github-starter/',
	server: {
		host: true,
		port: 3000,
		strictPort: true,
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks:
					mode === 'analyze'
						? undefined
						: {
								babylonjs: ['@babylonjs/core'],
								lit: ['lit'],
							},
			},
		},
		// Show detailed chunk information in analyze mode
		reportCompressedSize: mode === 'analyze',
	},
}));
