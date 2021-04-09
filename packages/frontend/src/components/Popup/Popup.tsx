/*
 * CS3099 Group A3
 */

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ReactElement } from "react";

/**
 * Properties for the [[`Popup`]] component.
 */
export interface PopupProps {
  /**
   * Message to display in the popup.
   */
  message?: string;
}

/**
 * Displays an error to the user in popup form
 *
 * Outline:
 *
 *  - Used if the user has tried to take an action that is invalid e.g. enterring the wrong login information.
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
