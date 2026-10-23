import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";

export type { TextFieldProps };

export const TextField = ({
  variant = "outlined",
  ...props
}: TextFieldProps) => <MuiTextField variant={variant} {...props} />;
