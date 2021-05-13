/*
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Kian Cross
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

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ReactElement } from "react";

/**
 * Properties for the [[`Popup`]] component.
 *
 * @internal
 */
export interface PopupProps {
  /**
   * Message to display in the popup.
   */
  message?: string;
}

/**
 * Displays an error or warning to the user as a
 * [popover](https://material-ui.com/components/popover/).
 *
 * Outline:
 *
 *  - For when user has taken an invalid action for which an error or warning
 *   needs to be displayed e.g. entering the wrong login information.
 *
 * @param props Properties passed to the component. See [[`PopupProps`]].
 *
 * @internal
 */
export function Popup(props: PopupProps): ReactElement {
  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={!!props.message}>
      <Alert severity="error">{props.message}</Alert>
    </Snackbar>
  );
}
