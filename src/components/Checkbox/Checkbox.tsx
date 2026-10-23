import MuiCheckbox, {
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";

export type CheckboxProps = Pick<
  FormControlLabelProps,
  | "label"
  | "checked"
  | "disabled"
  | "required"
  | "onChange"
  | "name"
  | "value"
  | "ref"
> &
  Pick<MuiCheckboxProps, "defaultChecked" | "indeterminate"> & {
    error?: boolean;
  };

export function Checkbox({
  defaultChecked,
  indeterminate,
  error,
  ...props
}: CheckboxProps) {
  return (
    <FormControlLabel
      {...props}
      control={
        <MuiCheckbox
          defaultChecked={defaultChecked}
          indeterminate={indeterminate}
          color={error ? "error" : "primary"}
        />
      }
    />
  );
}
