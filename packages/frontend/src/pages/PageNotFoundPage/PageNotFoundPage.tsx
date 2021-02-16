/*
 * CS3099 Group A3
 */

import React from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    paddingTop: "10rem",
    textAlign: "center",
  },
});

const PageNotFoundPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h6" gutterBottom>
        404 Page Not Found
      </Typography>
      <Button color="primary" variant="contained" href="/">
        Return Home
      </Button>
    </Container>
  );
};

export default PageNotFoundPage;
