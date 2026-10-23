import StyleDictionary from "style-dictionary";
import { minifyDictionary } from "style-dictionary/utils";

const out = "src/tokens/generated/";

StyleDictionary.registerFormat({
  name: "ds/ts-object",
  format: ({ dictionary, options }) =>
    `export const ${options.name} = ${JSON.stringify(minifyDictionary(dictionary.tokens, true), null, 2)} as const;\n`,
});

// Only the tokens of the file being built are written; the others are loaded to resolve references.
const onlySource = (token) => token.isSource;

const builds = [
  {
    name: "core",
    source: ["tokens/core.json"],
    include: [],
    selector: ":root",
  },
  {
    name: "light",
    source: ["tokens/theme.light.json"],
    include: ["tokens/core.json"],
    selector: ':root, [data-theme="light"]',
  },
  {
    name: "dark",
    source: ["tokens/theme.dark.json"],
    include: ["tokens/core.json"],
    selector: '[data-theme="dark"]',
  },
];

for (const { name, source, include, selector } of builds) {
  const sd = new StyleDictionary({
    source,
    include,
    usesDtcg: true,
    // Warnings are off because the semantic files reference core tokens that core.css defines: the filtered-out references are intended.
    log: { warnings: "disabled", verbosity: "silent" },
    platforms: {
      css: {
        transformGroup: "css",
        prefix: "ds",
        buildPath: out,
        files: [
          {
            destination: `${name}.css`,
            format: "css/variables",
            filter: onlySource,
            options: { selector, outputReferences: name !== "core" },
          },
        ],
      },
      ts: {
        transformGroup: "js",
        buildPath: out,
        files: [
          {
            destination: `${name}.ts`,
            format: "ds/ts-object",
            filter: onlySource,
            options: { name },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}
