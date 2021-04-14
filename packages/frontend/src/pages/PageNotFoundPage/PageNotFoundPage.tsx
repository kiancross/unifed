/*
 * CS3099 Group A3
 */

import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactElement } from "react";

import { ButtonLink } from "../../components/Links";

const useStyles = makeStyles({
  container: {
    paddingTop: "10rem",
    textAlign: "center",
  },
});

/**
 * Displays a '404 Page not Found' message if an invalid URL is entered.
 *
 * A [[`ButtonLink`]] is diplayed for the user to return home.
 *
 * @internal
 */
export function PageNotFoundPage(): ReactElement {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h6" gutterBottom>
        404 Page Not Found
      </Typography>
      <ButtonLink color="primary" variant="contained" to="/">
        Return Home
      </ButtonLink>
    </Container>
  );
}
