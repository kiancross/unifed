/*
 * CS3099 Group A3
 */

import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactElement } from "react";
import { ButtonLink } from "..";

/**
 * Properties for the [[`ErrorMessage`]] component.
 * 
 * @internal
 */
export interface ErrorMessageProps {
  /**
   * Error message to be displayed.
   */
  message: string;
}

const useStyles = makeStyles({
  container: {
    paddingTop: "10rem",
    textAlign: "center",
  },
});

/**
 * An formatted error message to be displayed to the user.
 *
 * Outline:
 *
 *  - Displays a message to the user indicating the problem.
 *
 *  - Provides a 'Return Home' button, taking the user to their Home Page when clicked.
 *
 * @param props Properties passed to the component. See [[`ErrorMessageProps`]].
 * @internal
 */
export function ErrorMessage(props: ErrorMessageProps): ReactElement {
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
}
