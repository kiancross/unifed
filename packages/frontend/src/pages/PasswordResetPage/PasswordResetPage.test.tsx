/*
 * CS3099 Group A3
 */

import { act, fireEvent, render } from "@testing-library/react";
import { AllTheProviders } from "../../helpers/test";
import React from "react";
import PasswordResetPage from "./PasswordResetPage";

test("Invalid passwords", async () => {
  const { getAllByText, getByTestId } = render(
    <AllTheProviders path="/reset-password/:token" initialEntries={["/reset-password/foo"]}>
      <PasswordResetPage />
    </AllTheProviders>,
  );
  fireEvent.change(getByTestId("new-pass-input"), { target: { value: "bar" } });
  fireEvent.change(getByTestId("retyped-pass-input"), { target: { value: "bar" } });
  await act(async () => {
    fireEvent.click(getByTestId("reset-pass-submit"));
  });
  getAllByText("Password not strong enough");
  fireEvent.change(getByTestId("new-pass-input"), { target: { value: "bar" } });
  fireEvent.change(getByTestId("retyped-pass-input"), { target: { value: "ham" } });
  await act(async () => {
    fireEvent.click(getByTestId("reset-pass-submit"));
  });
  getAllByText("Passwords do not match");
});
