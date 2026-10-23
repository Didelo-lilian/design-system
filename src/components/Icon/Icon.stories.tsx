import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { dark, light } from "../../tokens/index.ts";
import { Icon, iconNames } from "./Icon.tsx";

const meta = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "home" },
  argTypes: {
    name: { control: "select", options: iconNames },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    color: {
      control: "select",
      options: [
        "inherit",
        "action",
        "disabled",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info",
      ],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, canvas }) => {
    await expect(canvasElement.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await expect(canvas.queryByRole("img")).toBeNull();
  },
};

export const Small: Story = { args: { size: "small" } };

export const Medium: Story = { args: { size: "medium" } };

export const Large: Story = {
  args: { size: "large" },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("svg")).toHaveStyle({
      width: "35px",
      height: "35px",
    });
  },
};

export const ColorInherit: Story = { args: { color: "inherit" } };

export const ColorAction: Story = { args: { color: "action" } };

export const ColorDisabled: Story = { args: { color: "disabled" } };

export const ColorPrimary: Story = { args: { color: "primary" } };

export const ColorSecondary: Story = { args: { color: "secondary" } };

export const ColorSuccess: Story = { args: { color: "success" } };

export const ColorWarning: Story = { args: { color: "warning" } };

export const ColorError: Story = {
  args: { color: "error" },
  play: async ({ canvasElement, globals }) => {
    await expect(canvasElement.querySelector("svg")).toHaveStyle({
      color: (globals.theme === "dark" ? dark : light).theme.error.main,
    });
  },
};

export const ColorInfo: Story = { args: { color: "info" } };

export const Labelled: Story = {
  args: { name: "delete", titleAccess: "Delete the file", color: "error" },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole("img", { name: "Delete the file" });
    await expect(icon).not.toHaveAttribute("aria-hidden", "true");
    await expect(icon).toHaveAccessibleName("Delete the file");
  },
};

export const Gallery: Story = {
  render: (args) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))",
        gap: 2,
      }}
    >
      {iconNames.map((name) => (
        <Box
          key={name}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Icon {...args} name={name} />
          <Typography variant="caption">{name}</Typography>
        </Box>
      ))}
    </Box>
  ),
  play: async ({ canvasElement, canvas }) => {
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(
      iconNames.length,
    );
    await expect(canvas.getByText("arrow-back")).toBeVisible();
  },
};
