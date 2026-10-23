import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export type CardProps = Pick<
  MuiCardProps,
  "variant" | "children" | "className" | "ref" | "aria-labelledby"
>;

export function Card({ variant = "outlined", children, ...props }: CardProps) {
  return (
    <MuiCard variant={variant} {...props}>
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
}
