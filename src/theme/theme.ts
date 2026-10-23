import { createTheme } from "@mui/material/styles";
import { core, dark, light } from "../tokens/index.ts";

declare module "@mui/material/styles" {
  interface CssThemeVariables {
    enabled: true;
  }
}

const palette = ({ theme }: typeof light | typeof dark) => ({
  background: { default: theme.bg.default, paper: theme.bg.paper },
  text: { primary: theme.text.primary, secondary: theme.text.secondary },
  divider: theme.divider,
  primary: { main: theme.primary.main, contrastText: theme.primary.contrast },
  success: { main: theme.success.main },
  warning: { main: theme.warning.main },
  error: { main: theme.error.main },
});

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: '[data-theme="%s"]' },
  colorSchemes: {
    light: { palette: palette(light) },
    dark: { palette: palette(dark) },
  },
  spacing: Number.parseInt(core.space["1"], 10),
  shape: { borderRadius: Number.parseInt(core.radius.md, 10) },
  typography: {
    fontFamily: core.font.family.sans.join(", "),
    fontWeightRegular: core.font.weight.regular,
    fontWeightMedium: core.font.weight.medium,
    fontWeightBold: core.font.weight.bold,
  },
});
