/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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

import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { LoginCard } from "../LoginCard";

test("Login Card renders", async () => {
  const { getByRole, getByTestId } = render(
    <BrowserRouter>
      <LoginCard />
    </BrowserRouter>,
  );

  fireEvent.change(getByRole("textbox", { name: "email" }), {
    target: { value: "test@unifed.com" },
  });
  fireEvent.change(getByTestId("password"), {
    target: { value: "testpassword" },
  });

  await waitFor(() => {
    fireEvent.click(getByRole("button", { name: "submit" }));
  });
});
