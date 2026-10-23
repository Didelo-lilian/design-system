import Button from "@mui/material/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import { Dialog } from "./Dialog.tsx";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    open: false,
    onClose: fn(),
    title: "Delete this project?",
    children: "This action cannot be undone.",
  },
  // The dialog renders in a portal: a button opens it so the story shows the real flow.
  render: ({ open: _open, onClose, ...args }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open
        </Button>
        <Dialog
          {...args}
          open={open}
          onClose={(event, reason) => {
            onClose(event, reason);
            setOpen(false);
          }}
        />
      </>
    );
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const openDialog = async (canvas: ReturnType<typeof within>) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));
  return screen.findByRole("dialog");
};

const actions = (
  <>
    <Button>Cancel</Button>
    <Button variant="contained" color="error">
      Delete
    </Button>
  </>
);

export const Default: Story = {
  play: async ({ canvas, args }) => {
    const dialog = await openDialog(canvas);
    await expect(dialog).toHaveAccessibleName("Delete this project?");
    await expect(dialog).toHaveTextContent("This action cannot be undone.");

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await expect(args.onClose).toHaveBeenCalledTimes(1);
    await expect(args.onClose).toHaveBeenCalledWith(
      expect.anything(),
      "escapeKeyDown",
    );
  },
};

export const WithActions: Story = {
  args: { actions },
  play: async ({ canvas }) => {
    const dialog = await openDialog(canvas);
    const ui = within(dialog);
    const cancel = ui.getByRole("button", { name: "Cancel" });
    const remove = ui.getByRole("button", { name: "Delete" });
    // MUI's focus sentinels sit next to the container (role presentation), under the modal root.
    const modalRoot = dialog.closest('[role="presentation"]')?.parentElement;

    await waitFor(() => expect(dialog).toHaveFocus());
    await userEvent.tab();
    await expect(cancel).toHaveFocus();
    await userEvent.tab();
    await expect(remove).toHaveFocus();
    // Past the last button, focus lands on a sentinel of the dialog.
    await userEvent.tab();
    await expect(modalRoot).toContainElement(
      document.activeElement as HTMLElement,
    );
    // Backwards from the first button it would reach the "Open" button behind without the trap.
    cancel.focus();
    await userEvent.tab({ shift: true });
    await expect(modalRoot).toContainElement(
      document.activeElement as HTMLElement,
    );
    await expect(
      canvas.getByRole("button", { name: "Open", hidden: true }),
    ).not.toHaveFocus();
  },
};

export const Long: Story = {
  args: {
    title: "Terms of service",
    scroll: "paper",
    actions: <Button>Accept</Button>,
    children: Array.from({ length: 30 }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static filler content
      <p key={i}>
        Paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    )),
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true, maxWidth: "md", actions },
};
