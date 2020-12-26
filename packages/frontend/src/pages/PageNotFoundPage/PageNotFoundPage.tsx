/*
 * CS3099 Group A3
 */

import React from "react";
import { Button, Container, Typography } from "@material-ui/core";
import styles from "./PageNotFoundPage.module.scss";

const PageNotFoundPage = (): JSX.Element => {
  return (
    <Container className={styles.container}>
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
