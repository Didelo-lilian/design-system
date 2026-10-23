import assert from "node:assert/strict";
import { test } from "node:test";
import { dark, light } from "./index.ts";

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
