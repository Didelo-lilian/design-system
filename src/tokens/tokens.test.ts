import assert from "node:assert/strict";
import { test } from "node:test";
import { core, dark, light } from "./index.ts";

const paths = (node: object, prefix = ""): string[] =>
  Object.entries(node)
    .flatMap(([key, value]) =>
      typeof value === "object"
        ? paths(value, `${prefix}${key}.`)
        : [`${prefix}${key}`],
    )
    .sort();

test("light and dark define the same semantic tokens", () => {
  assert.deepEqual(paths(light), paths(dark));
});

test("each font family ends with a system fallback", () => {
  const fallbacks = ["system-ui", "sans-serif", "monospace"];
  for (const stack of Object.values(core.font.family)) {
    assert.ok(fallbacks.includes(stack.at(-1) ?? ""));
  }
});
