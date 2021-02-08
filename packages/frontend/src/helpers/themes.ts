/*
 * CS3099 Group A3
 */

import { PaletteType } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

export const standardTheme = {
  palette: {
    type: "light" as PaletteType,
    primary: {
      main: "#00539b",
    },
    secondary: {
      main: "#ffffff",
    },
  },
};

export const darkTheme = {
  palette: {
    type: "dark" as PaletteType,
    primary: {
      main: indigo[800],
    },
    secondary: {
      main: "#707070",
      dark: indigo[500],
    },
  },
};
