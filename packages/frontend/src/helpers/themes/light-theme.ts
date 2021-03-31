/*
 * CS3099 Group A3
 */

import { ThemeOptions } from "@material-ui/core";
import { baseTheme } from "./base-theme";

export const lightTheme: ThemeOptions = {
  ...baseTheme,
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
    type: "light",
    primary: {
      main: "#00539b",
    },
    secondary: {
      main: "#ffffff",
      dark: "#f9f9fb",
    },
    text: {
      primary: "#000000",
    },
  },
};
