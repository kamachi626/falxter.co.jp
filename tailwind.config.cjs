/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#6b1f32',
					dark: '#5a1a2a',
					light: '#7b1b2b'
				},
				gray: {
					50: '#f8f9fa',
					100: '#f1f3f5',
					300: '#dee2e6',
					500: '#adb5bd',
					700: '#495057',
					900: '#212529'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
