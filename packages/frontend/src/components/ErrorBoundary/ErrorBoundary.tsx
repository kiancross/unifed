// Makes use of https://reactjs.org/docs/error-boundaries.html

import React, { ErrorInfo } from "react";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

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
        <ErrorPage message="Something went wrong. Please try again and let us know if the problem persists" />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
