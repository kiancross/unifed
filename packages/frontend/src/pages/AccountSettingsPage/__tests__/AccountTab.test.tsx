/*
 * Copyright (C) 2021 Kian Cross
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
