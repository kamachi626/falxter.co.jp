import { defineConfig, devices } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT || "4321";
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : undefined,
  },
  webServer: {
    command: "node ./dist/server/entry.mjs",
    url: `${baseURL}/api/health/`,
    reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_PORT,
    env: {
      ...process.env,
      PLAYWRIGHT_TEST: "1",
      HOST: "127.0.0.1",
      PORT: port,
      MAIL_TRANSPORT: "mock",
      PUBLIC_SITE_URL: baseURL,
    },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
