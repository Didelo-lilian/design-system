import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";
import { Alert } from "./Alert.tsx";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: { children: "Your changes have been saved." },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SuccessSeverity: Story = { args: { severity: "success" } };

export const InfoSeverity: Story = {
  args: { severity: "info", children: "A new version is available." },
};

export const WarningSeverity: Story = {
  args: { severity: "warning", children: "Your session expires in 5 minutes." },
};

export const ErrorSeverity: Story = {
  args: { severity: "error", children: "The payment could not be processed." },
};

export const WithTitle: Story = {
  args: {
    severity: "warning",
    title: "Storage almost full",
    children: "You have used 95% of your storage.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Storage almost full",
    );
  },
};

export const Dismissible: Story = {
  args: { severity: "info", onClose: fn() },
  play: async ({ args, canvas }) => {
    await expect(canvas.getByRole("alert")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};
