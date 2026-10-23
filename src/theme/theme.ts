import { createTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import { core, dark, light } from "../tokens/index.ts";

declare module "@mui/material/styles" {
  interface CssThemeVariables {
    enabled: true;
  }
  interface TypographyVariants {
    code: CSSProperties;
  }
  interface TypographyVariantsOptions {
    code?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}

const { family, weight, size, lineHeight, letterSpacing } = core.font;
const stack = (names: readonly string[]) => names.join(", ");

const heading = (fontSize: string, fontWeight: number) => ({
  fontFamily: stack(family.display),
  fontSize,
  fontWeight,
  lineHeight: lineHeight.tight,
  letterSpacing: letterSpacing.tight,
});

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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "code, kbd, pre, samp": { fontFamily: stack(family.mono) },
      },
    },
  },
  typography: {
    fontFamily: stack(family.sans),
    fontWeightRegular: weight.regular,
    fontWeightMedium: weight.medium,
    fontWeightBold: weight.bold,
    h1: heading(size["4xl"], weight.bold),
    h2: heading(size["3xl"], weight.bold),
    h3: heading(size["2xl"], weight.bold),
    h4: heading(size.xl, weight.semibold),
    h5: heading(size.lg, weight.semibold),
    h6: heading(size.md, weight.semibold),
    body1: { fontSize: size.md, lineHeight: lineHeight.normal },
    body2: { fontSize: size.sm, lineHeight: lineHeight.normal },
    caption: { fontSize: size.xs, lineHeight: lineHeight.normal },
    button: { fontFamily: stack(family.sans), fontWeight: weight.semibold },
    code: {
      fontFamily: stack(family.mono),
      fontWeight: weight.regular,
      fontSize: size.sm,
      lineHeight: lineHeight.normal,
    },
  },
});
