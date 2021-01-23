import React from "react";
import { Button, Container, Typography } from "@material-ui/core";
import styles from "./ErrorPage.module.scss";

interface ErrorPageProps {
  message: string;
}

const ErrorPage = (props: ErrorPageProps): JSX.Element => {
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

export default ErrorPage;
