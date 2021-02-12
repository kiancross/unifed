/*
 * CS3099 Group A3
 */

import React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const TriggerError = (props: { error: boolean }): JSX.Element => {
  if (props.error) {
    throw new Error("Test Error");
  } else {
    return <div />;
  }
};

test("Error boundary", () => {
  const { queryByText, getByText, rerender } = render(
    <ErrorBoundary>
      <TriggerError error={false} />
    </ErrorBoundary>,
  );

  expect(queryByText(/Something went wrong/)).toBeNull();

  const consoleLog = console.log;
  const consoleError = console.error;
  console.log = jest.fn();
  console.error = jest.fn();

  rerender(
    <ErrorBoundary>
      <TriggerError error={true} />
    </ErrorBoundary>,
  );

  getByText(/Something went wrong/);

  console.log = consoleLog;
  console.error = consoleError;
});
