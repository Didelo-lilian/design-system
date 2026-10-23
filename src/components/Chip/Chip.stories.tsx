import Avatar from "@mui/material/Avatar";
import SvgIcon from "@mui/material/SvgIcon";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Chip } from "./Chip.tsx";

const tagIcon = (
  <SvgIcon>
    <path d="M21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
  </SvgIcon>
);

const deleteIcon = (root: HTMLElement) => {
  const icon = root.querySelector(".MuiChip-deleteIcon");
  if (!icon) throw new Error("The delete icon is missing");
  return icon;
};

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: { label: "Design system" },
  argTypes: {
    variant: { control: "inline-radio", options: ["filled", "outlined"] },
    size: { control: "inline-radio", options: ["small", "medium"] },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info",
      ],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outlined: Story = { args: { variant: "outlined" } };

export const Small: Story = { args: { size: "small" } };

export const Primary: Story = { args: { color: "primary" } };

export const OutlinedSuccess: Story = {
  args: { variant: "outlined", color: "success" },
};

export const WithIcon: Story = { args: { icon: tagIcon } };

export const WithAvatar: Story = {
  args: { avatar: <Avatar>L</Avatar>, label: "Lilian" },
};

export const Clickable: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const chip = canvas.getByRole("button", { name: "Design system" });
    await userEvent.click(chip);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    chip.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};

export const Deletable: Story = {
  args: { onDelete: fn() },
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(deleteIcon(canvasElement));
    await expect(args.onDelete).toHaveBeenCalledTimes(1);

    // The delete icon has no role or name: keyboard users delete from the chip itself.
    canvas.getByRole("button", { name: "Design system" }).focus();
    await userEvent.keyboard("{Backspace}");
    await expect(args.onDelete).toHaveBeenCalledTimes(2);
    await userEvent.keyboard("{Delete}");
    await expect(args.onDelete).toHaveBeenCalledTimes(3);
  },
};

export const ClickableAndDeletable: Story = {
  args: { onClick: fn(), onDelete: fn() },
  play: async ({ args, canvasElement, userEvent }) => {
    await userEvent.click(deleteIcon(canvasElement));
    await expect(args.onDelete).toHaveBeenCalledTimes(1);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: { onClick: fn(), onDelete: fn(), disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const chip = canvas.getByRole("button", { name: "Design system" });
    await expect(chip).toHaveAttribute("aria-disabled", "true");
    await expect(chip).toHaveStyle({ pointerEvents: "none" });
    await userEvent.tab();
    await expect(chip).not.toHaveFocus();
    chip.focus();
    await userEvent.keyboard("{Enter}{Backspace}");
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(args.onDelete).not.toHaveBeenCalled();
  },
};

export const StaticLabel: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
    await expect(canvas.getByText("Design system")).toBeVisible();
    await userEvent.tab();
    await expect(document.body).toHaveFocus();
  },
};
