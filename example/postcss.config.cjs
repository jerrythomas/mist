const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssFocusVisible = require('postcss-focus-visible');
const cssnano = require('cssnano');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
	plugins: [
		// require('postcss-ignore-plugin/remove'),
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		postcssFocusVisible(),
		// require('postcss-ignore-plugin/add'),
		autoprefixer(),
		!dev &&
			cssnano({
				preset: 'default'
			})
	]
};

module.exports = config;
