/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { ApolloError } from "@apollo/client/errors";
import { Button, ButtonProps, Snackbar } from "@material-ui/core";
import { CenteredLoader } from "../../components";
import { Alert } from "@material-ui/lab";

type ActionButtonProps = {
  errorMessage?: string;
  loading: boolean;
  error: ApolloError | undefined;
};

type Props = Omit<ButtonProps, "disabled"> & ActionButtonProps;

export const ActionButton = (props: Props): JSX.Element => {
  const { errorMessage, loading, error, children, onClick, ...buttonProps } = props;
  const [open, setOpen] = useState(true);

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(event);
    }
    setOpen(true);
  };

  if (loading)
    return (
      <Button disabled {...buttonProps}>
        <CenteredLoader size={24} color="inherit" />
      </Button>
    );

  if (error) {
    const message = errorMessage ? errorMessage : error.message;
    return (
      <React.Fragment>
        <Button onClick={handleClick} children={children} {...buttonProps} />
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert children={message} onClose={handleClose} severity="error" />
        </Snackbar>
      </React.Fragment>
    );
  }

  return <Button onClick={handleClick} children={children} {...buttonProps} />;
};
