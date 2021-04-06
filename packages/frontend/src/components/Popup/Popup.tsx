/*
 * CS3099 Group A3
 */

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ReactElement } from "react";

interface PropsTypes {
  message?: string;
}

export function Popup(props: PropsTypes): ReactElement {
  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={!!props.message}>
      <Alert severity="error">{props.message}</Alert>
    </Snackbar>
  );
}
