import { afterEach, expect } from "vitest";
import { page } from "vitest/browser";

// After each story (play function included): its canvas, the plain <div> Storybook adds to the body, or the whole
// viewport when the story opened something over the page (dialog, menu, tooltip).
afterEach(async () => {
  await document.fonts.ready;
  const overlay = document.querySelector(
    "body > .MuiModal-root, body > .MuiPopper-root",
  );
  const target = overlay
    ? document.body
    : document.querySelector("body > div:not([class]):not([id])");
  await expect(page.elementLocator(target as Element)).toMatchScreenshot();
});
