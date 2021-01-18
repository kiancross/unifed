import React from "react";
import { Button, Container, Typography } from "@material-ui/core";
import styles from "../../pages/PageNotFoundPage/PageNotFoundPage.module.scss";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    return (
      <Container className={styles.container}>
        <Typography variant="h6" gutterBottom>
          There was an error when carrrying out the request. Please try again and if the error
          persists, let us know and we will fix it!
        </Typography>
        <Button color="primary" variant="contained" href="/">
          Return Home
        </Button>
      </Container>
    );
  }
}

export default ErrorBoundary;
