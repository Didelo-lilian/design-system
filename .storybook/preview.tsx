import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "../src/tokens/generated/core.css";
import "../src/tokens/generated/light.css";
import "../src/tokens/generated/dark.css";
import { theme } from "../src/theme/index.ts";

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
