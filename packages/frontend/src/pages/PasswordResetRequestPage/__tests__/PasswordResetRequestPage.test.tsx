/*
 * CS3099 Group A3
 */

import { Router } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { PasswordResetRequestPage } from "../PasswordResetRequestPage";

test("Return to login redirects correctly", async () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  const { getByTestId } = render(
    <Router history={history}>
      <PasswordResetRequestPage />
    </Router>,
  );

  fireEvent.click(getByTestId("login-return-button"));

  expect(history.push).toHaveBeenCalledWith("/login");
});
