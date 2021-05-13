/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
