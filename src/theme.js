import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  // shadows: ["none"],
  shadows: [
    "0px 11px 15px -7px red,0px 24px 38px 3px red,0px 9px 46px 8px red ",
  ],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
