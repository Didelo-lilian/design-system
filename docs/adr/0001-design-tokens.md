# 1. Design tokens in DTCG, built by Style Dictionary

Date: 2026-10-23 · Status: accepted

## Context

Colors, spacing, radius and typography must live in one place, and reach two consumers: plain CSS (variables) and the MUI theme (a typed object). The system has a light and a dark mode.

## Decision

- One JSON source in the [DTCG](https://www.designtokens.org) format under `tokens/`: `core.json` (raw values) and `theme.light.json` / `theme.dark.json` (semantic names such as `theme.bg.default`, which reference core tokens).
- [Style Dictionary](https://styledictionary.com) builds, into `src/tokens/generated/`, CSS variables prefixed `--ds-` (`core.css`, `light.css`, `dark.css`) and one typed module per file for the MUI theme.
- The generated files are not committed: `npm run tokens` creates them, and `npm run check`, `npm run storybook` and CI run it first.
- Dark is selected with `[data-theme="dark"]`, light is the default.
- A test checks that light and dark define exactly the same semantic tokens, so a token cannot exist in one mode only.

## Consequences

- A change to a value is a pull request on a JSON file; no component holds a color of its own.
- Values are written in the string syntax (`"#2563eb"`, `"4px"`). The 2025 DTCG revision uses objects for colors and dimensions: to revisit when Style Dictionary documents it for this version.
- Contrast between text and background is not checked yet: it comes with the accessibility work.
- Semantic CSS variables point to core variables, so `core.css` must always be loaded with `light.css` and `dark.css`.
