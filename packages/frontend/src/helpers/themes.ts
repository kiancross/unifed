/*
 * CS3099 Group A3
 */

import { PaletteType } from "@material-ui/core";
import { indigo, grey } from "@material-ui/core/colors";

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
      main: indigo[500],
    },
    secondary: {
      main: grey[600],
    },
  },
};
