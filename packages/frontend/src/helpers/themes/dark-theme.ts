/*
 * CS3099 Group A3
 */

import { ThemeOptions } from "@material-ui/core";
import { baseTheme } from "./base-theme";

export const darkTheme: ThemeOptions = {
  ...baseTheme,
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
    type: "dark",
    primary: {
      main: "#04001c",
    },
    secondary: {
      main: "#606060",
      dark: "#3e3e3e",
    },
    text: {
      primary: "#ffffff",
    },
  },
};
