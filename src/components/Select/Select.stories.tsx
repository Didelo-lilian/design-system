import MenuItem from "@mui/material/MenuItem";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { Select } from "./Select.tsx";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Fruit",
    fullWidth: true,
    onChange: fn(),
    children: [
      <MenuItem key="apple" value="apple">
        Apple
      </MenuItem>,
      <MenuItem key="banana" value="banana">
        Banana
      </MenuItem>,
      <MenuItem key="cherry" value="cherry">
        Cherry
      </MenuItem>,
    ],
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["outlined", "filled", "standard"],
    },
    size: { control: "inline-radio", options: ["small", "medium"] },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: "" } };

export const WithValue: Story = { args: { defaultValue: "banana" } };

export const Small: Story = { args: { defaultValue: "apple", size: "small" } };

export const Disabled: Story = {
  args: { defaultValue: "apple", disabled: true },
};

export const WithHelperText: Story = {
  args: { defaultValue: "", helperText: "Pick your favourite fruit." },
};

export const WithError: Story = {
  args: {
    defaultValue: "",
    error: true,
    required: true,
    helperText: "A fruit is required.",
  },
  play: async ({ canvas }) => {
    const combobox = canvas.getByRole("combobox");
    await expect(combobox).toHaveAccessibleDescription("A fruit is required.");
  },
};

export const ChooseWithMouse: Story = {
  args: { defaultValue: "" },
  play: async ({ canvas, userEvent, args }) => {
    const combobox = canvas.getByRole("combobox", { name: "Fruit" });
    await expect(combobox).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(combobox);
    await expect(combobox).toHaveAttribute("aria-expanded", "true");

    // The menu renders in a portal, outside the story canvas.
    const listbox = within(await within(document.body).findByRole("listbox"));
    await userEvent.click(listbox.getByRole("option", { name: "Cherry" }));

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(combobox).toHaveTextContent("Cherry");
    await waitFor(() =>
      expect(combobox).toHaveAttribute("aria-expanded", "false"),
    );
  },
};

export const ChooseWithKeyboard: Story = {
  args: { defaultValue: "" },
  play: async ({ canvas, userEvent, args }) => {
    const combobox = canvas.getByRole("combobox", { name: "Fruit" });
    combobox.focus();
    await userEvent.keyboard("{Enter}");
    await expect(combobox).toHaveAttribute("aria-expanded", "true");

    await userEvent.keyboard("{ArrowDown}{Enter}");

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(combobox).toHaveTextContent(/Apple|Banana/);
  },
};
