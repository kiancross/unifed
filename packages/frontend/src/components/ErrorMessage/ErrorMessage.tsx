/*
 * CS3099 Group A3
 */

import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonLink } from "../../components/Links";

interface ErrorMessageProps {
  message: string;
}

const useStyles = makeStyles({
  container: {
    paddingTop: "10rem",
    textAlign: "center",
  },
});

const ErrorMessage = (props: ErrorMessageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h6" gutterBottom>
        {props.message}
      </Typography>
      <ButtonLink color="primary" variant="contained" to="/">
        Return Home
      </ButtonLink>
    </Container>
  );
};

export default ErrorMessage;
