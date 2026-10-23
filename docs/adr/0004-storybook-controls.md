# 4. Storybook controls from react-docgen-typescript, filtered globally

Date: 2026-10-23 · Status: accepted

## Context

The Controls tab and the docs tables are built from the component's props. With the default parser (`react-docgen`), a wrapper typed `Omit<MuiAlertProps, …>` showed four props, and `severity` was a free text box: the parser does not resolve types declared in `node_modules`, so it never saw the union `"error" | "info" | "success" | "warning"`. Button only had selects because its story listed the options by hand. Adding the missing props naively would be worse: MUI components inherit ~300 props each (DOM attributes, `sx`, `classes`, `slotProps`, ripple, `tabIndex`…), most of which cannot be edited from a control.

## Decision

- `typescript.reactDocgen: "react-docgen-typescript"` in `.storybook/main.ts`, with `shouldExtractLiteralValuesFromEnum` (unions become option lists) and `shouldRemoveUndefinedFromOptional`. Both packages already ship with `@storybook/react-vite`: no new tooling beyond the compiler below.
- `react-docgen-typescript` needs the TypeScript compiler API, which TypeScript 7 (Go rewrite) no longer exposes. The repo stays on TypeScript 7 for `tsc`; `@typescript/typescript6` (Microsoft's compatibility build) is a dev dependency, and `main.ts` puts it in the module cache under the name `typescript` before the parser loads.
- A global `propFilter` keeps a prop only if its type can be edited (option list, boolean, string, number, `ReactNode`) and either the repo declares it or it is on a short list of useful MUI props (`variant`, `size`, `color`, `severity`, `disabled`, `fullWidth`, `label`, `helperText`…). DOM attributes from `@types/react` never pass.
- `parameters.controls.exclude` in `.storybook/preview.tsx` hides, by name pattern, what is still not editable (`ref`, `sx`, `classes`, `slots`, `slotProps`, `component`, `className`, `style`, `icon`, `actions`, `onX` handlers). Handlers still log in the Actions panel, since stories pass `fn()`.
- `.storybook/controls.ts` (an `argTypesEnhancer`) turns each option list into inline radios (up to 3 options) or a select, and a `ReactNode` prop into a text control, or hides it when the story passes an element.
- Per-story `argTypes` still win, so a component can override any of this.

## Alternatives considered

- **Keep `react-docgen`, list options by hand in every story** (what Button did): no tooling, but every component repeats MUI's unions and they drift when MUI changes.
- **Redeclare the unions in each wrapper's own props type** so `react-docgen` can see them: the duplication moves into `src/` and changes public types for a documentation tool.
- **Downgrade `typescript` to 6**: removes the shim but fights Dependabot and gives up TypeScript 7's faster `tsc`.
- **`propFilter` on `node_modules` only** (the Storybook default): hides `severity` and `variant` again.
- **Hide props only with `controls.exclude`**: a name list cannot know that `tabIndex` or `focusRipple` are noise for a design system.

## Consequences

- The Storybook build goes from ~1.9 s to ~3.1 s (cold cache, 3 runs each, this machine): the compiler now type-checks the components for the docs.
- The shim in `main.ts` is temporary: remove it when `react-docgen-typescript` supports TypeScript 7, or when Storybook ships another TypeScript-aware parser.
- A MUI prop not on the list stays hidden until it is added to `muiProp` in `main.ts`; a prop declared in the repo is always shown if its type is editable.
- MUI's description and default now appear in the docs tables.
- Slimming the stories down to a playground plus the states that really differ is a separate change, after the open component pull requests are merged.
