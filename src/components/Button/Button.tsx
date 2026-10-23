import MuiButton, { type ButtonProps } from "@mui/material/Button";

export type { ButtonProps };

export const Button = ({ disableElevation = true, ...props }: ButtonProps) => (
  <MuiButton disableElevation={disableElevation} {...props} />
);
