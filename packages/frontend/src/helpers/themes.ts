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
};
