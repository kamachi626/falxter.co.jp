/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#6b1f32',
					light: '#7b2a3f',
					dark: '#551527'
				}
			},
			fontFamily: {
				sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
};
