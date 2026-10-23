import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Card } from "./Card.tsx";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    "aria-labelledby": "card-title",
    children: (
      <>
        <Typography id="card-title" variant="h6" component="h2">
          Card title
        </Typography>
        <Typography color="text.secondary">
          Supporting text that describes the card content.
        </Typography>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: { variant: "outlined" },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { name: "Card title", level: 2 }),
    ).toBeVisible();
    await expect(
      canvas.getByText("Supporting text that describes the card content."),
    ).toBeVisible();
  },
};

export const Elevation: Story = { args: { variant: "elevation" } };

export const TextOnly: Story = {
  args: {
    "aria-labelledby": undefined,
    children: <Typography>A card holding a single paragraph.</Typography>,
  },
};
