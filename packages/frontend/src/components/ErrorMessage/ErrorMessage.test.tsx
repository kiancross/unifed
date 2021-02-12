/*
 * CS3099 Group A3
 */

import { render } from "@testing-library/react";
import React from "react";
import ErrorMessage from "./ErrorMessage";

test("Renders Error Message", () => {
  const message = "Test Message";
  const { getByText } = render(<ErrorMessage message={message} />);

  getByText("Test Message");
});
