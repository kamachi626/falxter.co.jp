/** @type {import('tailwindcss').Config} */
module.exports = {
content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
theme: {
extend: {
colors: {
primary: {
50: '#f9f1f3',
100: '#f3e3e8',
200: '#e5c2cb',
300: '#d59cac',
400: '#ba6c7d',
500: '#a24a5d',
600: '#8c3347',
700: '#7b1b2b',
800: '#6b1f32',
900: '#561526',
},
neutral: {
50: '#f8fafc',
100: '#eef2f6',
200: '#d7dce2',
300: '#c2cbd3',
400: '#9aa7b2',
500: '#6b7280',
600: '#505662',
700: '#3c424f',
800: '#232935',
900: '#121722',
},
},
fontFamily: {
sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
},
boxShadow: {
card: '0 10px 25px -12px rgba(0, 0, 0, 0.15)',
},
},
},
plugins: [],
};
