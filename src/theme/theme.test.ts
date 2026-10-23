import assert from "node:assert/strict";
import { test } from "node:test";
import { core, dark, light } from "../tokens/index.ts";
import { theme } from "./theme.ts";

test("the color schemes come from the tokens", () => {
  for (const [name, tokens] of [
    ["light", light],
    ["dark", dark],
  ] as const) {
    const { palette } = theme.colorSchemes[name] ?? {};
    assert.equal(palette?.primary.main, tokens.theme.primary.main);
    assert.equal(palette?.background.paper, tokens.theme.bg.paper);
    assert.equal(palette?.text.primary, tokens.theme.text.primary);
  }
});

test("the fonts come from the tokens", () => {
  const { typography } = theme;
  const { family, weight } = core.font;
  assert.equal(typography.fontFamily, family.sans.join(", "));
  assert.equal(typography.button.fontFamily, family.sans.join(", "));
  assert.equal(typography.code.fontFamily, family.mono.join(", "));
  for (const variant of ["h1", "h2", "h3", "h4", "h5", "h6"] as const) {
    assert.equal(typography[variant].fontFamily, family.display.join(", "));
  }
  assert.equal(typography.h1.fontWeight, weight.bold);
});
