import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";
import { Button } from "./Button.tsx";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button", onClick: fn() },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["text", "outlined", "contained"],
    },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info",
        "inherit",
      ],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "contained" },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Button" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Outlined: Story = { args: { variant: "outlined" } };

export const Text: Story = { args: { variant: "text" } };

export const Small: Story = { args: { variant: "contained", size: "small" } };

export const Large: Story = { args: { variant: "contained", size: "large" } };

export const ErrorColor: Story = {
  args: { variant: "contained", color: "error" },
};

export const Disabled: Story = {
  args: { variant: "contained", disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Button" })).toBeDisabled();
  },
};
