/*
 * CS3099 Group A3
 */

// Derived from:
// https://reactjs.org/docs/error-boundaries.html

import React, { ErrorInfo } from "react";
import { ErrorMessage } from "..";

interface PropsType {
  hasError?: boolean;
}

interface StateTypes {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<PropsType, StateTypes> {
  constructor(props: PropsType) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log(info);
    console.log(error);
    this.setState({ hasError: true });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorMessage message="Something went wrong. Please try again and let us know if the problem persists." />
      );
    }
    return this.props.children;
  }
}
