import { getQueriesForElement } from "@testing-library/react";
import React from "react";
import * as ReactDOM from "react-dom";

import ErrorPage from "./ErrorPage";

test("Renders Error Message", () => {
  const message = "Test Message";
  const root = document.createElement("div");
  ReactDOM.render(<ErrorPage message={message} />, root);

  const { getByText } = getQueriesForElement(root);

  expect(getByText("Test Message")).not.toBeNull();
});
