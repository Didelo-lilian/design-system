# 3. Typography: Bricolage Grotesque, Figtree and JetBrains Mono, self-hosted

Date: 2026-10-23 · Status: accepted

## Context

The theme listed Inter first but never shipped it, so every visitor saw their own system font and the design system had no typographic identity. Headings, body text and code have different jobs and deserve different voices.

## Decision

- **Bricolage Grotesque** for headings (`h1`–`h6`, token `font.family.display`), **Figtree** for text, buttons and labels (`font.family.sans`), **JetBrains Mono** for code (`font.family.mono`).
- Self-hosted through [Fontsource](https://fontsource.org): `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/figtree` and `@fontsource-variable/jetbrains-mono`, pinned to exact versions. The `.woff2` files are bundled by Vite into the Storybook build and served by the same nginx image as the pages: no request to Google Fonts or any third party at runtime.
- All three are variable fonts: one file per script covers every weight. Only the normal style is imported (no italics). `font-display: swap` comes from Fontsource's CSS: text shows at once in the fallback font and is swapped when the file arrives.
- Bricolage Grotesque is imported with its `opsz` axis (`opsz.css`, `wght` + optical size) so large headings get the tighter, more expressive cut; the `wdth` axis is left out. Figtree and JetBrains Mono use `wght.css`.
- Families are tokens in `tokens/core.json`, each ending with a system fallback stack. Sizes, weights, line heights and the heading letter spacing are tokens too. The MUI theme reads them: no font name or size in a component.
- Licences: the three fonts are under the [SIL Open Font License 1.1](https://openfontlicense.org) (Bricolage Grotesque, Figtree and JetBrains Mono Project Authors). The OFL allows use, embedding and redistribution, including commercially, as long as the licence text travels with the font files: Fontsource ships it as `LICENSE` in each package.

## Alternatives considered

- **Inter alone**: safe and very readable, but it is everywhere and gives no identity.
- **Space Grotesk + DM Sans**: a close second; Space Grotesk's quirks wear thin in long headings.
- **Fraunces + Inter**: a serif for headings is elegant but suits editorial sites better than a UI kit.
- **Plus Jakarta Sans**: pleasant, but one family for everything would have been the same trade-off as Inter.
- **Google Fonts `<link>`**: no install, but a third-party request on every page view (privacy, an extra connection, a blocking CSS file) for no benefit over self-hosting.

## Consequences

- Assets grow: the Storybook build went from 9.7 MB to 10.0 MB (+268 KB), of which a visitor downloads only the latin subset (about 138 KB, with `latin-ext` loaded only when an accented character needs it). The Bricolage `opsz` axis costs about 36 KB more than `wght` alone.
- Fontsource's axis CSS lists every subset (latin, latin-ext, vietnamese, plus cyrillic and greek for JetBrains Mono). The browser fetches a file only when a character falls in its `unicode-range`, but the unused files are still in the image (about 42 KB). Importing only latin and latin-ext would mean copying Fontsource's `@font-face` rules and maintaining them by hand: not worth it.
- Updates arrive through Dependabot like any other dependency.
- A consumer of the future npm package must load the fonts itself (or accept the fallback stack): the theme only names them.
- Contrast and minimum sizes still belong to the accessibility work.
