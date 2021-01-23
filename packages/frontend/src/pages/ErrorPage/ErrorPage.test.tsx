import { render } from "@testing-library/react";
import React from "react";

import ErrorPage from "./ErrorPage";

test("Renders Error Message", () => {
  const message = "Test Message";
  const { getByText } = render(<ErrorPage message={message} />);

  expect(getByText("Test Message")).not.toBeNull();
});
