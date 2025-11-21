/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f8ebef',
					100: '#f1d7df',
					200: '#e2afc0',
					300: '#d486a0',
					400: '#c55e81',
					500: '#b73561',
					600: '#7b1f2b',
					700: '#6b1f32',
					800: '#521628',
					900: '#3a0f1c'
				}
			},
			fontFamily: {
				sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
}
