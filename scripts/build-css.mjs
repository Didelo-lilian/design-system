import { copyFileSync, readFileSync, writeFileSync } from "node:fs";

// The CSS the package ships next to the JavaScript: the tokens as custom properties, and the fonts.
const generated = "src/tokens/generated";
writeFileSync(
  "dist/tokens.css",
  ["core", "light", "dark"]
    .map((name) => readFileSync(`${generated}/${name}.css`, "utf8"))
    .join("\n"),
);
copyFileSync("src/fonts.css", "dist/fonts.css");
