/*
 * CS3099 Group A3
 */

import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

export const standardTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#00539b",
    },
    secondary: {
      main: "#e6e6e6",
    },
  },
  typography: {
    subtitle2: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
  },
});
