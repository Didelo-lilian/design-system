import MuiTooltip, {
  type TooltipProps as MuiTooltipProps,
} from "@mui/material/Tooltip";
import type { Ref } from "react";

export type TooltipProps = Omit<MuiTooltipProps, "ref"> & {
  ref?: Ref<Element>;
};

/**
 * Thin wrapper over the MUI Tooltip. It needs a single child that can hold a ref: wrap a disabled button in a `span`.
 * A string `title` also becomes the child's accessible name; use `describeChild` to make it a description instead.
 */
export const Tooltip = ({ arrow = true, ...props }: TooltipProps) => (
  <MuiTooltip arrow={arrow} {...props} />
);
