import path from 'path'
import adapter from '@sveltejs/adapter-static'
import WindiCSS from 'vite-plugin-windicss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		}),
		vite: {
			// ssr: {
			//   external: Object.keys(pkg.dependencies),
			// },
			plugins: [WindiCSS()],
			resolve: {
				alias: {
					$config: path.resolve('./src/config')
				}
			}
		}
	}
	// preprocess: [
	// 	preprocess({
	// 		postcss: true
	// 	})
	// ]
}

export default config
