import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface PropsTypes {
  message: string;
  open: boolean;
}

const Popup = (props: PropsTypes): JSX.Element => {
  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={props.open}>
      <Alert severity="error">{props.message}</Alert>
    </Snackbar>
  );
};

export default Popup;
