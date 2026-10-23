// What the published package must offer: it imports in Node and exposes every component, the theme and the tokens.
import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";

const lib = await import(new URL("../dist/index.js", import.meta.url));
const components = readdirSync("src/components", {
  withFileTypes: true,
}).filter((e) => e.isDirectory());
for (const { name } of components)
  assert.ok(name in lib, `${name} is not exported`);
for (const name of ["theme", "core", "light", "dark"])
  assert.ok(name in lib, `${name} is not exported`);
for (const file of ["index.d.ts", "tokens.css", "fonts.css"])
  assert.ok(existsSync(`dist/${file}`), `dist/${file} is missing`);
console.log(`package ok: ${components.length} components, theme and tokens`);
