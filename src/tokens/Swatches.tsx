import type { CSSProperties } from "react";
import { core, dark, light } from "./index.ts";

type Tree = { readonly [key: string]: string | Tree };

const flatten = (tree: Tree, prefix = ""): [string, string][] =>
  Object.entries(tree).flatMap(([key, value]) =>
    typeof value === "string"
      ? [[`${prefix}${key}`, value]]
      : flatten(value, `${prefix}${key}.`),
  );

const code: CSSProperties = {
  background: "transparent",
  color: "inherit",
  padding: 0,
};

const list: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: 12,
  padding: 0,
  margin: "16px 0",
  listStyle: "none",
};

export const CoreColors = () => (
  <ul style={list}>
    {flatten(core.color).map(([name, value]) => (
      <li key={name} style={{ fontSize: 13 }}>
        <div
          style={{
            background: value,
            height: 48,
            borderRadius: 8,
            border: "1px solid #94a3b8",
          }}
        />
        <strong>{name}</strong>
        <br />
        <code style={code}>{value}</code>
      </li>
    ))}
  </ul>
);

const theme = (tokens: typeof light | typeof dark) => (
  <ul
    style={{
      ...list,
      background: tokens.theme.bg.default,
      padding: 16,
      borderRadius: 8,
    }}
  >
    {flatten(tokens.theme).map(([name, value]) => (
      <li
        key={name}
        style={{
          fontSize: 13,
          padding: 8,
          borderRadius: 8,
          background: tokens.theme.bg.paper,
          color: tokens.theme.text.primary,
          border: `1px solid ${tokens.theme.divider}`,
        }}
      >
        <div
          style={{
            background: value,
            height: 24,
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <strong>{name}</strong>
        <br />
        <code style={code}>{value}</code>
      </li>
    ))}
  </ul>
);

export const ThemeColors = ({ mode }: { mode: "light" | "dark" }) =>
  theme(mode === "light" ? light : dark);

export const Spacing = () => (
  <ul style={list}>
    {flatten(core.space).map(([name, value]) => (
      <li key={name} style={{ fontSize: 13 }}>
        <div style={{ background: "#2563eb", height: 16, width: value }} />
        <strong>space.{name}</strong> <code style={code}>{value}</code>
      </li>
    ))}
  </ul>
);
