import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Tooltip } from "./Tooltip.tsx";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    title: "Save the document",
    children: <button type="button">Save</button>,
  },
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
    arrow: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div
        style={{ padding: "4rem", display: "flex", justifyContent: "center" }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

// The tooltip renders in a portal, outside the story canvas.
const body = () => within(document.body);

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    // MUI turns a string title into the child's accessible name (see `describeChild`).
    await userEvent.hover(
      canvas.getByRole("button", { name: "Save the document" }),
    );
    await expect(await body().findByRole("tooltip")).toHaveTextContent(
      "Save the document",
    );
  },
};

/** `describeChild` keeps the child's own name and uses the title as its description. */
export const DescribeChild: Story = {
  args: { describeChild: true },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Save" });
    await userEvent.hover(button);
    await expect(await body().findByRole("tooltip")).toHaveTextContent(
      "Save the document",
    );
    await expect(button).toHaveAccessibleDescription("Save the document");
  },
};

export const WithoutArrow: Story = {
  args: { arrow: false },
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(
      canvas.getByRole("button", { name: "Save the document" }),
    ).toHaveFocus();
    const tooltip = await body().findByRole("tooltip");
    await expect(tooltip).toHaveTextContent("Save the document");
    await expect(tooltip.querySelector(".MuiTooltip-arrow")).toBeNull();
  },
};

export const Placements: Story = {
  args: { open: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "flex", gap: "10rem", padding: "2rem" }}>
      {(["top", "right", "bottom", "left"] as const).map((placement) => (
        <Tooltip
          key={placement}
          {...args}
          title={placement}
          placement={placement}
        >
          <button type="button">{placement}</button>
        </Tooltip>
      ))}
    </div>
  ),
  play: async () => {
    await waitFor(() => expect(body().getAllByRole("tooltip")).toHaveLength(4));
  },
};

/** MUI does not listen to a disabled button, so the tooltip goes on a `span` around it. */
export const DisabledButton: Story = {
  args: { title: "You do not have the right to save" },
  render: (args) => (
    <Tooltip {...args}>
      <span style={{ display: "inline-block" }}>
        <button type="button" disabled>
          Save
        </button>
      </span>
    </Tooltip>
  ),
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole("button", { name: "Save" })).toBeDisabled();
    await userEvent.hover(
      canvas.getByRole("button", { name: "Save" }).parentElement as HTMLElement,
    );
    await expect(await body().findByRole("tooltip")).toHaveTextContent(
      "You do not have the right to save",
    );
  },
};

export const KeyboardFocusAndEscape: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(
      canvas.getByRole("button", { name: "Save the document" }),
    ).toHaveFocus();
    await expect(await body().findByRole("tooltip")).toHaveTextContent(
      "Save the document",
    );

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body().queryByRole("tooltip")).toBeNull());
  },
};
