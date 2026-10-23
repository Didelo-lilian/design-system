import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";
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
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Email");
    await userEvent.type(input, "ada@example.com");
    await expect(input).toHaveValue("ada@example.com");
  },
};

export const Filled: Story = { args: { variant: "filled" } };

export const Standard: Story = { args: { variant: "standard" } };

export const Small: Story = { args: { size: "small" } };

export const WithHelperText: Story = {
  args: { helperText: "We never share your email." },
};

export const Required: Story = { args: { required: true } };

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
  args: { disabled: true, defaultValue: "ada@example.com" },
};

export const Multiline: Story = {
  args: { label: "Message", multiline: true, minRows: 3 },
};
