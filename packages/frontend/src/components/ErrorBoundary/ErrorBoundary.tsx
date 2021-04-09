/*
 * CS3099 Group A3
 */

// Derived from:
// https://reactjs.org/docs/error-boundaries.html

import React, { ErrorInfo } from "react";
import { ErrorMessage } from "..";

/**
 * Properties for the [[`ErrorBoundary`]] component.
 */
interface ErrorBoundaryProps {
  /**
   * True if the app has encountered an error that has not been caught
   */
  hasError?: boolean;
}

/**
 * State types for the [[`ErrorBoundary`]] component.
 */
interface ErrorBoundaryStates {
  /**
   * Can be true or false as an error either has or has not occured.
   */
  hasError: boolean;
}

/**
 * Catches bugs with the App that have not been caught earlier, such as any Javascript errors.
 *
 * @internal
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryStates> {
  constructor(props: ErrorBoundaryProps) {
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
