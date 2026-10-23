import MuiAlert, {
  type AlertProps as MuiAlertProps,
} from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import type { ReactNode, Ref } from "react";

export type AlertProps = Omit<
  MuiAlertProps,
  "classes" | "color" | "iconMapping" | "role" | "slotProps" | "slots" | "title"
> & {
  /** Optional heading rendered above the message. */
  title?: ReactNode;
  ref?: Ref<HTMLDivElement>;
};

/** Thin wrapper over the MUI Alert. Passing `onClose` renders the close button. */
export const Alert = ({
  severity = "info",
  title,
  children,
  ...props
}: AlertProps) => (
  <MuiAlert severity={severity} {...props}>
    {title ? <AlertTitle>{title}</AlertTitle> : null}
    {children}
  </MuiAlert>
);
