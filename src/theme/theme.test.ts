import assert from "node:assert/strict";
import { test } from "node:test";
import { dark, light } from "../tokens/index.ts";
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
