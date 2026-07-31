import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "http://localhost:4321",
  output: "server",
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
  }),
  env: {
    schema: {
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public",
        default: "",
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      TURNSTILE_EXPECTED_HOSTNAME: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      MAIL_TRANSPORT: envField.string({
        context: "server",
        access: "secret",
        default: "mock",
      }),
      AWS_REGION: envField.string({
        context: "server",
        access: "secret",
        default: "ap-northeast-1",
      }),
      AWS_ACCESS_KEY_ID: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      AWS_SECRET_ACCESS_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      CONTACT_FROM_EMAIL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      CONTACT_TO_EMAIL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      CONTACT_REPLY_TO_EMAIL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      PLAYWRIGHT_TEST: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
  trailingSlash: "always",
  redirects: {
    "/sitemap.xml": {
      status: 301,
      destination: "/sitemap-index.xml",
    },
    "/services/system-assessment/": {
      status: 301,
      destination: "/services/system-support/#assessment",
    },
    "/services/system-maintenance/": {
      status: 301,
      destination: "/services/system-support/#spot-maintenance",
    },
  },
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
