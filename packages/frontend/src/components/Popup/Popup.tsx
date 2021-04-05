/*
 * CS3099 Group A3
 */

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface PropsTypes {
  message?: string;
}

export function Popup(props: PropsTypes) {
  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={!!props.message}>
      <Alert severity="error">{props.message}</Alert>
    </Snackbar>
  );
}
