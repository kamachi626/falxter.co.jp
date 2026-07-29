import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "http://localhost:4321",
  output: "server",
  adapter: node({ mode: "standalone" }),
  trailingSlash: "always",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: { sourcemap: false },
    server: {
      watch: {
        usePolling: process.env.VITE_USE_POLLING === "true",
        interval: 300,
      },
    },
  },
  security: { checkOrigin: true },
});
