/*
 * CS3099 Group A3
 */

import { act, fireEvent, render } from "@testing-library/react";
import { BrowserMockProvider } from "../../helpers/";

import { PasswordResetPage } from "./PasswordResetPage";

test("Invalid passwords", async () => {
  const { getAllByText, getByRole } = render(
    <BrowserMockProvider path="/reset-password/:token" initialEntries={["/reset-password/foo"]}>
      <PasswordResetPage />
    </BrowserMockProvider>,
  );

  fireEvent.change(getByRole("textbox", { name: "new password" }), {
    target: { value: "bar" },
  });

  fireEvent.change(getByRole("textbox", { name: "retype new password" }), {
    target: { value: "bar" },
  });

  // fireEvent.change(getByTestId("new-pass-input"), { target: { value: "bar" } });
  // fireEvent.change(getByTestId("retyped-pass-input"), { target: { value: "bar" } });

  await act(async () => {
    fireEvent.click(getByRole("button", { name: "submit" }));
  });

  getAllByText("Password not strong enough");

  fireEvent.change(getByRole("textbox", { name: "new password" }), {
    target: { value: "bar" },
  });

  fireEvent.change(getByRole("textbox", { name: "retype new password" }), {
    target: { value: "ham" },
  });

  // fireEvent.change(getByTestId("new-pass-input"), { target: { value: "bar" } });
  // fireEvent.change(getByTestId("retyped-pass-input"), { target: { value: "ham" } });

  await act(async () => {
    fireEvent.click(getByRole("button", { name: "submit" }));
  });

  getAllByText("Passwords do not match");
});
