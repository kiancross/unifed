import React, { ErrorInfo } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import styles from "./ErrorBoundary.module.scss";

interface PropsType {
  hasError?: boolean;
}

interface StateTypes {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<PropsType, StateTypes> {
  constructor(props: PropsType) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error);
    console.log(info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className={styles.container}>
          <Typography variant="h6" gutterBottom>
            Something went wrong. Please try again and if the problem persists let us know!
          </Typography>
          <Button color="primary" variant="contained" href="/">
            Return Home
          </Button>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
