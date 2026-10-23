import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MuiSelect, {
  type SelectProps as MuiSelectProps,
} from "@mui/material/Select";
import { type ReactNode, useId } from "react";

export type SelectProps = Omit<MuiSelectProps, "variant"> & {
  variant?: MuiSelectProps["variant"];
  helperText?: ReactNode;
};

export function Select({
  variant = "outlined",
  label,
  helperText,
  error,
  disabled,
  required,
  size,
  fullWidth,
  sx,
  ...props
}: SelectProps) {
  const id = useId();
  const helperId = `${id}-helper`;

  return (
    <FormControl
      variant={variant}
      error={error}
      disabled={disabled}
      required={required}
      size={size}
      fullWidth={fullWidth}
      sx={sx}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <MuiSelect
        {...props}
        variant={variant}
        labelId={`${id}-label`}
        label={label}
        SelectDisplayProps={{
          "aria-describedby": helperText ? helperId : undefined,
        }}
      />
      {helperText && (
        <FormHelperText id={helperId}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
