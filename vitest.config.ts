import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

// The baselines are rendered on Linux (the CI), so the screenshot check only runs there, or when VISUAL=1.
const visual = Boolean(process.env.CI || process.env.VISUAL);

// Every story runs twice, once per color scheme: a play function, an axe check, a screenshot, in light and in dark.
const project = (theme: "light" | "dark") => ({
  extends: true as const,
  plugins: [storybookTest({ configDir: ".storybook" })],
  define: { "import.meta.env.STORY_THEME": JSON.stringify(theme) },
  test: {
    name: theme,
    setupFiles: visual ? [".storybook/vitest.visual.ts"] : [],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium", viewport: { width: 640, height: 480 } }],
      expect: {
        toMatchScreenshot: {
          // <component>/__screenshots__/<file>/<theme>/<story>.png, with no platform in the name.
          resolveScreenshotPath: ({ root, testFileDirectory, testFileName, arg, ext }) =>
            `${root}/${testFileDirectory}/__screenshots__/${testFileName}/${theme}/${arg}${ext}`,
          // No transition, ripple or caret in a screenshot: they make it depend on timing.
          screenshotOptions: { animations: "disabled" as const, caret: "hide" as const },
          comparatorName: "pixelmatch" as const,
          comparatorOptions: { threshold: 0.2, allowedMismatchedPixelRatio: 0.001 },
        },
      },
    },
  },
});

export default defineConfig({ test: { projects: [project("light"), project("dark")] } });
