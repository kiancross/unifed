/*
 * CS3099 Group A3
 */

import { PaletteType } from "@material-ui/core";

export const standardTheme = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          "background-color": "#F1F2F6",
        },
      },
    },
  },
  palette: {
    type: "light" as PaletteType,
    primary: {
      main: "#00539b",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      primary: "#000000",
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
};

export const darkTheme = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          "background-color": "#303030",
        },
      },
    },
  },
  palette: {
    type: "dark" as PaletteType,
    primary: {
      main: "#04001c",
    },
    secondary: {
      main: "#606060",
    },
    text: {
      primary: "#ffffff",
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
};
