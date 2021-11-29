import { pink } from 'windicss/colors'
function withOpacity(cssVariable) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${cssVariable}), ${opacityValue})`
		}
		return `rgb(var(${cssVariable}))`
	}
}
const config = {
	// mode: 'aot',
	// purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
	extract: {
		include: [
			'./**/*.{html,js,svelte,ts,css}',
			'./node_modules/svelte-themable-ui/src/**/*.{html,js,svelte,ts,css}'
		]
	},
	theme: {
		fontFamily: {
			mono: ['Victor-Mono', 'monospace'],
			cursive: ['Kalam', 'cursive'],
			serif: ['Montserrat Alternates', 'ui-serif', 'sans-serif'],
			body: ['Montserrat Alternates', 'ui-serif', 'sans-serif']
		},

		extend: {
			fontSize: {
				xxl: '10rem'
			},
			textColor: {
				skin: {
					base: withOpacity('--color-text-base'),
					hover: withOpacity('--color-text-hover'),
					inverted: withOpacity('--color-fill-base')
				}
			},
			backgroundColor: {
				skin: {
					base: withOpacity('--color-fill-base'),
					hover: withOpacity('--color-fill-hover'),
					muted: withOpacity('--color-fill-muted'),
					inverted: withOpacity('--color-text-base')
				}
			},
			borderColor: {
				skin: {
					base: withOpacity('--color-line-base')
					// muted: withOpactity('--color-fill-muted')
				}
			},
			colors: {
				primary: {
					DEFAULT: '#FB8C00',
					50: '#FFF2E2',
					100: '#FFE7C8',
					200: '#FFD095',
					300: '#FFBA62',
					400: '#FFA32F',
					500: '#FB8C00',
					600: '#C87000',
					700: '#955300',
					800: '#623700',
					900: '#2F1A00'
				},
				secondary: pink
			},
			backgroundImage: (theme) => ({
				texture: "url('/subtle-grey.png')"
			})
		}
	},
	// variants: {
	// 	extend: {
	// 		borderRadius: ['first', 'last'],
	// 		borderWidth: ['first', 'last'],
	// 		textDecoration: ['focus-visible']
	// 	}
	// },

	plugins: [
		require('windicss/plugin/line-clamp'),
		require('windicss/plugin/aspect-ratio')
	]
}

// export default config
module.exports = config
