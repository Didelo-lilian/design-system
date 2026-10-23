import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Switch } from "./Switch.tsx";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { label: "Enable notifications", onChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
  play: async ({ canvas, userEvent, args }) => {
    const toggle = canvas.getByRole("switch", { name: "Enable notifications" });
    await expect(toggle).toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
};

export const Disabled: Story = { args: { disabled: true } };

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const Small: Story = { args: { size: "small" } };

export const Toggle: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const toggle = canvas.getByRole("switch", { name: "Enable notifications" });
    await expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);

    await userEvent.click(canvas.getByText("Enable notifications"));
    await expect(toggle).not.toBeChecked();

    toggle.focus();
    await expect(toggle).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(toggle).toBeChecked();
    await userEvent.keyboard(" ");
    await expect(toggle).not.toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(4);
  },
};

export const DisabledSkipsKeyboard: Story = {
  args: { disabled: true },
  play: async ({ canvas, userEvent, args }) => {
    const toggle = canvas.getByRole("switch", { name: "Enable notifications" });
    await expect(toggle).toBeDisabled();
    await userEvent.tab();
    await expect(toggle).not.toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(toggle).not.toBeChecked();
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};
