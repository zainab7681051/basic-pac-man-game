// vite.config.js
import {
	resolve
} from 'path'
import {
	defineConfig
} from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				game: resolve(__dirname, 'game.html'),
			},
		},
	},
})