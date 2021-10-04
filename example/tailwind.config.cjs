const colors = require('tailwindcss/colors');

function withOpacity(cssVariable) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${cssVariable}), ${opacityValue})`;
		}
		return `rgb(var(${cssVariable}))`;
	};
}
const config = {
	mode: 'aot',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
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
				secondary: colors.pink
				// secondary: {
				// 	DEFAULT: '#FA5C84',
				// 	50: '##FDF2F8',
				// 	100: '#FCE7F3',
				// 	200: '#FBCFE8',
				// 	300: '#FDBFCF',
				// 	400: '#FC8DA9',
				// 	500: '#FA5C84',
				// 	600: '#F82B5F',
				// 	700: '#E90740',
				// 	800: '#B70633',
				// 	900: '#860425'
				// }
			},
			backgroundImage: (theme) => ({
				texture: "url('/subtle-grey.png')"
			})
		}
	},
	variants: {
		extend: {
			borderRadius: ['first', 'last'],
			borderWidth: ['first', 'last'],
			textDecoration: ['focus-visible']
		}
	},

	plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp')]
};

module.exports = config;
