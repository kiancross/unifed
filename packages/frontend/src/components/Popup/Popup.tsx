/*
 * CS3099 Group A3
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
