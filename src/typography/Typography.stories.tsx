import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { core } from "../tokens/index.ts";

const meta = { title: "Foundations/Typography" } satisfies Meta;

export default meta;

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 àéîõü ł ő ž ß € → ≠";

const families = [
  {
    token: "display",
    name: "Bricolage Grotesque",
    use: "Headings",
    sx: { fontFamily: "var(--ds-font-family-display)", fontWeight: 700 },
  },
  {
    token: "sans",
    name: "Figtree",
    use: "Text, buttons, labels",
    sx: { fontFamily: "var(--ds-font-family-sans)", fontWeight: 400 },
  },
  {
    token: "mono",
    name: "JetBrains Mono",
    use: "Code",
    sx: { fontFamily: "var(--ds-font-family-mono)", fontWeight: 400 },
  },
] as const;

export const Families: StoryObj = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 720 }}>
      {families.map(({ token, name, use, sx }) => (
        <Box key={token}>
          <Typography variant="caption" color="text.secondary">
            {use} · --ds-font-family-{token}
          </Typography>
          <Typography sx={{ ...sx, fontSize: core.font.size["4xl"] }}>
            {name}
          </Typography>
          <Typography sx={{ ...sx, fontSize: core.font.size.lg }}>
            {alphabet}
          </Typography>
          <Typography variant="code" color="text.secondary">
            {core.font.family[token].join(", ")}
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
};

const variants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "body1",
  "body2",
  "button",
  "caption",
  "code",
] as const;

export const Scale: StoryObj = {
  render: () => {
    const { typography } = useTheme();
    return (
      <Stack spacing={3} sx={{ maxWidth: 720 }}>
        {variants.map((variant) => {
          const { fontSize, fontWeight, lineHeight } = typography[variant];
          return (
            <Box key={variant}>
              <Typography variant="caption" color="text.secondary">
                {variant} · {fontSize} · {fontWeight} · line height {lineHeight}
              </Typography>
              <Typography variant={variant} component="div">
                Sphinx of black quartz, judge my vow
              </Typography>
            </Box>
          );
        })}
      </Stack>
    );
  },
};

const weights = {
  display: [200, 300, 400, 500, 600, 700, 800],
  sans: [300, 400, 500, 600, 700, 800, 900],
  mono: [100, 200, 300, 400, 500, 600, 700, 800],
} as const;

export const Weights: StoryObj = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 720 }}>
      {families.map(({ token, name, sx }) => (
        <Box key={token}>
          <Typography variant="caption" color="text.secondary">
            {name} is a variable font: any weight from {weights[token][0]} to{" "}
            {weights[token].at(-1)}
          </Typography>
          {weights[token].map((fontWeight) => (
            <Typography
              key={fontWeight}
              component="div"
              sx={{ ...sx, fontWeight, fontSize: core.font.size.xl }}
            >
              {fontWeight} · Handgloves, quickly
            </Typography>
          ))}
        </Box>
      ))}
    </Stack>
  ),
};

export const Article: StoryObj = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="h2" component="h1">
        Why letters matter
      </Typography>
      <Typography variant="h5" component="p" color="text.secondary">
        A page is mostly text, so the type does most of the design.
      </Typography>
      <Typography>
        Headings carry the personality of an interface: they are read first, and
        they are set larger, so a typeface with character belongs there. Body
        text is the opposite. It is read for minutes at a time, in small sizes,
        so it should be calm, open and easy to tell apart from letter to letter.
        That is why the two are not the same family.
      </Typography>
      <Typography>
        Numbers, identifiers and snippets such as <code>--ds-font-size-md</code>{" "}
        need yet another voice: a monospaced one, where every character has the
        same width and <code>1</code>, <code>l</code> and <code>I</code> cannot
        be confused. Accents work too: café, naïve, Łódź, Dvořák, straße.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        All three fonts are variable fonts under the SIL Open Font License, and
        are served with the page.
      </Typography>
    </Stack>
  ),
};
