/*
 * Copyright (C) 2021 Robert Mardall
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

import { render } from "@testing-library/react";
import { UserIcon } from "./UserIcon";
import { BrowserRouter } from "react-router-dom";

const username = "testuser";
const firstLetter = "T";
test("normal size renders", () => {
  const { getByText } = render(<UserIcon username={username} />, { wrapper: BrowserRouter });

  getByText(firstLetter);
});

test("small size renders", () => {
  const { getByText } = render(<UserIcon username={username} small />, { wrapper: BrowserRouter });

  getByText(firstLetter);
});
