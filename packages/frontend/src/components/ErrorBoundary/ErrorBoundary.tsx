/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

// Derived from:
// https://reactjs.org/docs/error-boundaries.html

import React, { ErrorInfo } from "react";
import { ErrorMessage } from "..";

/**
 * Properties for the [[`ErrorBoundary`]] component.
 *
 * @internal
 */
export interface ErrorBoundaryProps {
  /**
   * Indicates whether the application has encountered an error that has not been caught.
   *
   * @internal
   */
  hasError?: boolean;
}

/**
 * State for the [[`ErrorBoundary`]] component.
 *
 * @internal
 */
export interface ErrorBoundaryStates {
  /**
   * Can be true or false as an error either has or has not occured.
   */
  hasError: boolean;
}

/**
 * Catches exceptions thrown within the application that have not been caught, then
 * displays an error message to the user.
 *
 * This component could not be written as a functional component, as we needed
 * access to the `componentDidCatch` hook.
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
