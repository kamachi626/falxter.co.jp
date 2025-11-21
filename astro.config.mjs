import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
	site: 'https://falxter.co.jp',
	integrations: [tailwind({ config: 'tailwind.config.cjs' })]
});
