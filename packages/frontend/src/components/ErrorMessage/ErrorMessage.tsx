/*
 * CS3099 Group A3
 */

import React from "react";
import { Button, Container, Typography } from "@material-ui/core";
import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = (props: ErrorMessageProps): JSX.Element => {
  return (
    <Container className={styles.container}>
      <Typography variant="h6" gutterBottom>
        {props.message}
      </Typography>
      <Button color="primary" variant="contained" href="/">
        Return Home
      </Button>
    </Container>
  );
};

export default ErrorMessage;
