import yaml from 'js-yaml'
import fs from 'fs'
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	// the `slug` parameter is available because this file
	// is called [slug].js
	const { slug } = params
	console.log(slug)

	try {
		const file = fs.readFileSync(`./static/data/${slug}.yaml`, 'utf8')
		const data = yaml.load(file)

		if (data) {
			return {
				body: {
					data
				}
			}
		}
	} catch (err) {
		return {
			status: 500,
			body: { ...err }
		}
	}
}
