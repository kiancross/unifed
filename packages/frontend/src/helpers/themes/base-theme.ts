/*
 * CS3099 Group A3
 */

import { ThemeOptions } from "@material-ui/core";

/**
 * Properties that are common to both the [[`lightTheme`]] and [[`darkTheme`]].
 *
 * @internal
 */
export const baseTheme: ThemeOptions = {
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
