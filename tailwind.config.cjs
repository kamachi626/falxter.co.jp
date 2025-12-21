/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#7d0015'
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [require('flowbite/plugin')]
};
