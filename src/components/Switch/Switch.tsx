import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import MuiSwitch, {
  type SwitchProps as MuiSwitchProps,
} from "@mui/material/Switch";

export type SwitchProps = Pick<
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
  Pick<MuiSwitchProps, "defaultChecked" | "size">;

export function Switch({ defaultChecked, size, ...props }: SwitchProps) {
  return (
    <FormControlLabel
      {...props}
      control={<MuiSwitch defaultChecked={defaultChecked} size={size} />}
    />
  );
}
