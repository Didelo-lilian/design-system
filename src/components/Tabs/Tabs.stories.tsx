import Box from "@mui/material/Box";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";
import { Tabs } from "./Tabs.tsx";

const items = [
  { label: "Overview", value: "overview", content: "Overview content" },
  { label: "Details", value: "details", content: "Details content" },
  { label: "History", value: "history", content: "History content" },
];

const manyItems = Array.from({ length: 14 }, (_, index) => ({
  label: `Section ${index + 1}`,
  value: `section-${index + 1}`,
  content: `Section ${index + 1} content`,
}));

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: { items, onChange: fn(), "aria-label": "Sections" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["standard", "fullWidth", "scrollable"],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const overview = canvas.getByRole("tab", { name: "Overview" });
    const details = canvas.getByRole("tab", { name: "Details" });
    await expect(overview).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
      "Overview content",
    );

    await userEvent.click(details);
    await expect(details).toHaveAttribute("aria-selected", "true");
    await expect(overview).toHaveAttribute("aria-selected", "false");
    await expect(args.onChange).toHaveBeenCalledOnce();
    await expect(args.onChange).toHaveBeenCalledWith(
      expect.anything(),
      "details",
    );

    const panel = canvas.getByRole("tabpanel");
    await expect(panel).toHaveTextContent("Details content");
    await expect(panel).toHaveAttribute(
      "id",
      details.getAttribute("aria-controls") ?? "",
    );
    await expect(panel).toHaveAttribute("aria-labelledby", details.id);
  },
};

export const DefaultValue: Story = { args: { defaultValue: "history" } };

export const FullWidth: Story = { args: { variant: "fullWidth" } };

export const WithDisabledTab: Story = {
  args: {
    items: items.map((item) =>
      item.value === "details" ? { ...item, disabled: true } : item,
    ),
  },
  play: async ({ canvas, userEvent, args }) => {
    const details = canvas.getByRole("tab", { name: "Details" });
    await expect(details).toBeDisabled();
    await userEvent.setup({ pointerEventsCheck: 0 }).click(details);
    await expect(args.onChange).not.toHaveBeenCalled();
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
      "Overview content",
    );
  },
};

export const ManyTabs: Story = {
  args: { items: manyItems, variant: "scrollable" },
  render: (args) => (
    <Box sx={{ maxWidth: (theme) => theme.spacing(60) }}>
      <Tabs {...args} />
    </Box>
  ),
};

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("history");
    return (
      <Tabs
        {...args}
        value={value}
        onChange={(event, next) => {
          setValue(next);
          args.onChange?.(event, next);
        }}
      />
    );
  },
  play: async ({ canvas, userEvent, args }) => {
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
      "History content",
    );
    await userEvent.click(canvas.getByRole("tab", { name: "Overview" }));
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
      "Overview content",
    );
    await expect(args.onChange).toHaveBeenCalledWith(
      expect.anything(),
      "overview",
    );
  },
};

export const KeyboardNavigation: Story = {
  args: {
    items: items.map((item) =>
      item.value === "details" ? { ...item, disabled: true } : item,
    ),
  },
  play: async ({ canvas, userEvent, args }) => {
    const overview = canvas.getByRole("tab", { name: "Overview" });
    const history = canvas.getByRole("tab", { name: "History" });

    overview.focus();
    await expect(overview).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(history).toHaveFocus();
    await expect(overview).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{ArrowLeft}");
    await expect(overview).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{Enter}");
    await expect(history).toHaveAttribute("aria-selected", "true");
    await expect(args.onChange).toHaveBeenCalledWith(
      expect.anything(),
      "history",
    );
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
      "History content",
    );
  },
};
