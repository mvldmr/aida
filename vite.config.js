// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	base: 'aida/',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				eng: resolve(__dirname, 'eng.html')
			}
		}
	}
})