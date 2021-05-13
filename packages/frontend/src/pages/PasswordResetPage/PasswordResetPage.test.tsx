/*
 * Copyright (C) 2021 Allan Mathew Chacko
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Lewis Mazzei
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
