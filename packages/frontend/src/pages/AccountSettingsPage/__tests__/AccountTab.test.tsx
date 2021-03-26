/*
 * CS3099 Group A3
 */

import { fireEvent, render, waitFor } from "@testing-library/react";

import { AccountTab } from "../AccountTab";

test("Change password dialog", async () => {
  const { getByTestId } = render(<AccountTab username="foo" email="bar" />);

  fireEvent.click(getByTestId("change-password-button"));

  await waitFor(() => {
    getByTestId("old-password");
    getByTestId("new-password");
    getByTestId("confirm-password");
    getByTestId("confirm-password");
    getByTestId("change-password-submit");
  });
});
