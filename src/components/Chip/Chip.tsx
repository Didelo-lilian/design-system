import MuiChip, { type ChipProps } from "@mui/material/Chip";

export type { ChipProps };

/**
 * Thin wrapper over the MUI Chip. `onClick` or `onDelete` makes it a focusable `button`.
 * The delete icon is `aria-hidden` and not focusable: keyboard users press Backspace or Delete on the chip.
 */
export const Chip = (props: ChipProps) => <MuiChip {...props} />;
