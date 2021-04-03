/*
 * CS3099 Group A3
 */

import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

const TriggerError = (props: { error: boolean }): ReactElement => {
  if (props.error) {
    throw new Error("Test Error");
  } else {
    return <div />;
  }
};

test("Error boundary", () => {
  const { queryByText, getByText, rerender } = render(
    <BrowserRouter>
      <ErrorBoundary>
        <TriggerError error={false} />
      </ErrorBoundary>
    </BrowserRouter>,
  );

  expect(queryByText(/Something went wrong/)).toBeNull();

  const consoleLog = console.log;
  const consoleError = console.error;
  console.log = jest.fn();
  console.error = jest.fn();

  rerender(
    <BrowserRouter>
      <ErrorBoundary>
        <TriggerError error={true} />
      </ErrorBoundary>
    </BrowserRouter>,
  );

  getByText(/Something went wrong/);

  console.log = consoleLog;
  console.error = consoleError;
});
