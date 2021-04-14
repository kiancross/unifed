/*
 * CS3099 Group A3
 */

import { ThemeOptions } from "@material-ui/core";
import { baseTheme } from "./base-theme";

/**
 * The properties for the dark theme of the application.
 * 
 * @internal
 */
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
    },
    text: {
      primary: "#ffffff",
    },
  },
};
