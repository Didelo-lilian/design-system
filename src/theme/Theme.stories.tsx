import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Foundations/Theme" } satisfies Meta;

export default meta;

// Plain MUI components, to show what the theme does; the design system components come next.
export const Overview: StoryObj = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 480 }}>
      <Typography variant="h4" component="h1">
        Theme
      </Typography>
      <Typography color="text.secondary">
        Palette, spacing, radius and font come from the design tokens. Use the
        toolbar to switch between light and dark.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Stack>
      <TextField label="Label" defaultValue="Value" helperText="Helper text" />
      <Alert severity="success">Success</Alert>
      <Alert severity="warning">Warning</Alert>
      <Alert severity="error">Error</Alert>
    </Stack>
  ),
};
