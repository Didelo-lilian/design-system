import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-vite";

// react-docgen-typescript needs the TypeScript compiler API, which TypeScript 7 no longer ships:
// hand it the TypeScript 6 build before it first requires "typescript".
const require = createRequire(import.meta.url);
const typescriptPath = require.resolve("typescript");
require.cache[typescriptPath] = {
  id: typescriptPath,
  filename: typescriptPath,
  loaded: true,
  exports: require("@typescript/typescript6"),
} as NodeJS.Module;

// Types the Controls tab can edit: option list, boolean, text, number. Callbacks, objects and elements are left out.
const editableType = /^(enum|boolean|string|number|ReactNode)$/;

// The MUI props worth changing live; the other ~30 per component (ripple, tabIndex, DOM attributes…) are noise.
const muiProp =
  /^(children|variant|size|color|severity|disabled|fullWidth|label|helperText|placeholder|error|required|multiline|checked|indeterminate|clickable|elevation)$/;

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  core: { disableTelemetry: true },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // The default filter drops every prop declared in node_modules, which hides MUI's `severity`, `variant`…
      // Keep the repo's props, plus the whitelisted MUI ones (not the DOM attributes of @types/react).
      propFilter: (prop) =>
        editableType.test(prop.type.name) &&
        (!prop.parent?.fileName.includes("node_modules") ||
          (prop.parent.fileName.includes("@mui/") && muiProp.test(prop.name))),
    },
  },
};

export default config;
