import MuiDialog, {
  type DialogProps as MuiDialogProps,
} from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { type ReactNode, type Ref, useCallback, useId, useState } from "react";

export type DialogProps = Omit<
  MuiDialogProps,
  "aria-labelledby" | "classes" | "slotProps" | "slots" | "title"
> & {
  /** Heading of the dialog; it is also the accessible name. */
  title: ReactNode;
  /** Footer content, usually buttons. */
  actions?: ReactNode;
  onClose: NonNullable<MuiDialogProps["onClose"]>;
  ref?: Ref<HTMLDivElement>;
};

/** Thin wrapper over the MUI Dialog: the title labels the dialog, children scroll in the content area. */
export const Dialog = ({ title, actions, children, ...props }: DialogProps) => {
  const titleId = useId();
  const [scrollable, setScrollable] = useState(false);
  const watchOverflow = useCallback((content: HTMLElement | null) => {
    if (!content) return;
    const observer = new ResizeObserver(() =>
      setScrollable(content.scrollHeight > content.clientHeight),
    );
    observer.observe(content);
    return () => observer.disconnect();
  }, []);
  return (
    <MuiDialog aria-labelledby={titleId} {...props}>
      <DialogTitle id={titleId}>{title}</DialogTitle>
      {/* Only a scrolling content gets a tab stop, so keyboard users can scroll it (axe scrollable-region-focusable). */}
      <DialogContent ref={watchOverflow} tabIndex={scrollable ? 0 : undefined}>
        {children}
      </DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </MuiDialog>
  );
};
