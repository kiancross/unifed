/*
 * CS3099 Group A3
 */

import { render, fireEvent } from "@testing-library/react";
import { PasswordField } from "./PasswordField";

test("Hidden (default)", () => {
  const { getByLabelText } = render(<PasswordField id="password" label="password" />);

  expect(getByLabelText("password")).toHaveProperty("type", "password");
});

test("Visible", () => {
  const { getByLabelText, getByRole } = render(<PasswordField id="password" label="password" />);

  fireEvent.click(getByRole("button"));

  expect(getByLabelText("password")).toHaveProperty("type", "text");
});
