import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import MuiTabs, { type TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import {
  type ReactNode,
  type Ref,
  type SyntheticEvent,
  useId,
  useState,
} from "react";

export type TabItem = {
  label: ReactNode;
  value: string;
  content: ReactNode;
  disabled?: boolean;
};

export type TabsProps = Omit<
  MuiTabsProps,
  "children" | "classes" | "defaultValue" | "onChange" | "value"
> & {
  items: TabItem[];
  /** Selected tab when controlled. */
  value?: string;
  /** Initially selected tab when uncontrolled; defaults to the first enabled tab. */
  defaultValue?: string;
  onChange?: (event: SyntheticEvent, value: string) => void;
  ref?: Ref<HTMLDivElement>;
};

/** Thin wrapper over the MUI Tabs that also renders one tab panel per item. */
export const Tabs = ({
  items,
  value,
  defaultValue,
  onChange,
  ...props
}: TabsProps) => {
  const id = useId();
  const [selected, setSelected] = useState(
    defaultValue ?? items.find((item) => !item.disabled)?.value,
  );
  const current = value ?? selected ?? false;

  const handleChange = (event: SyntheticEvent, next: string) => {
    setSelected(next);
    onChange?.(event, next);
  };

  return (
    <>
      <MuiTabs {...props} value={current} onChange={handleChange}>
        {items.map(({ label, value: itemValue, disabled }, index) => (
          <Tab
            key={itemValue}
            label={label}
            value={itemValue}
            disabled={disabled}
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
          />
        ))}
      </MuiTabs>
      {items.map(({ value: itemValue, content }, index) => (
        <Box
          key={itemValue}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={itemValue !== current}
          sx={{ pt: 2 }}
        >
          {itemValue === current ? content : null}
        </Box>
      ))}
    </>
  );
};
