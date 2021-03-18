/*
 * CS3099 Group A3
 */

import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

test("Renders Error Message", () => {
  const message = "Test Message";
  const { getByText } = render(
    <BrowserRouter>
      <ErrorMessage message={message} />
    </BrowserRouter>,
  );

  getByText("Test Message");
});
