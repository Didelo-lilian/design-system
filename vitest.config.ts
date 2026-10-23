import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

// Every story runs twice, once per color scheme: a play function, an axe check, in light and in dark.
const project = (theme: "light" | "dark") => ({
  extends: true as const,
  plugins: [storybookTest({ configDir: ".storybook" })],
  define: { "import.meta.env.STORY_THEME": JSON.stringify(theme) },
  test: {
    name: theme,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});

export default defineConfig({ test: { projects: [project("light"), project("dark")] } });
