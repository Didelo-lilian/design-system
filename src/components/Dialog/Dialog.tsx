import MuiDialog, {
  type DialogProps as MuiDialogProps,
} from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { type ReactNode, type Ref, useId } from "react";

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
  return (
    <MuiDialog aria-labelledby={titleId} {...props}>
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </MuiDialog>
  );
};
