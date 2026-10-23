import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/figtree/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "../src/tokens/generated/core.css";
import "../src/tokens/generated/light.css";
import "../src/tokens/generated/dark.css";
import { theme } from "../src/theme/index.ts";
import { refineControls } from "./controls.ts";

const SyncMode = ({ mode }: { mode: "light" | "dark" }) => {
  const { setMode } = useColorScheme();
  useEffect(() => setMode(mode), [mode, setMode]);
  return null;
};

const withTheme: Decorator = (Story, { globals }) => (
  <ThemeProvider theme={theme} noSsr>
    <CssBaseline enableColorScheme />
    <SyncMode mode={globals.theme} />
    <Story />
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withTheme],
  argTypesEnhancers: [refineControls],
  parameters: {
    controls: {
      expanded: true,
      disableSaveFromUI: true,
      // Props with no sensible text/number/boolean/option control: refs, styling hooks, slots, handlers, icons and nodes.
      exclude:
        /^(ref|key|className|style|sx|classes|slots|slotProps|component|actions?|icon|avatar|on[A-Z].*|\w+Icon)$/,
    },
  },
  initialGlobals: { theme: "light" },
  globalTypes: {
    theme: {
      description: "Color scheme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
