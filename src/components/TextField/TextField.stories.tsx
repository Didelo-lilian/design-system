import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";
import { TextField } from "./TextField.tsx";

const meta = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: { label: "Email" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["outlined", "filled", "standard"],
    },
    size: { control: "inline-radio", options: ["small", "medium"] },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onChange: fn() },
  play: async ({ args, canvas }) => {
    const input = canvas.getByLabelText("Email");
    await userEvent.type(input, "ada@example.com");
    await expect(input).toHaveValue("ada@example.com");
    await expect(args.onChange).toHaveBeenCalledTimes("ada@example.com".length);
  },
};

export const Filled: Story = { args: { variant: "filled" } };

export const Standard: Story = { args: { variant: "standard" } };

export const Small: Story = { args: { size: "small" } };

export const WithHelperText: Story = {
  args: { helperText: "We never share your email." },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Email")).toHaveAccessibleDescription(
      "We never share your email.",
    );
  },
};

export const Required: Story = {
  args: { required: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/Email/)).toBeRequired();
  },
};

export const WithError: Story = {
  args: {
    error: true,
    defaultValue: "ada@",
    helperText: "Enter a valid email address.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/Email/)).toBeInvalid();
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "ada@example.com", onChange: fn() },
  play: async ({ args, canvas }) => {
    const input = canvas.getByLabelText("Email");
    await expect(input).toBeDisabled();
    await userEvent.type(input, "x");
    await expect(input).toHaveValue("ada@example.com");
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const Multiline: Story = {
  args: { label: "Message", multiline: true, minRows: 3 },
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", { name: "Message" });
    await userEvent.type(textarea, "Hello{Enter}World");
    await expect(textarea).toHaveValue("Hello\nWorld");
  },
};
