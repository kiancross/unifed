/*
 * Copyright (C) 2020 Allan Mathew Chacko
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

import { BrowserRouter } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserInfoCard } from "./UserInfoCard";

const username = "js123";
const name = "John Smith";

describe("Renders UserInfoCard", () => {
  afterEach(cleanup);

  it("renders correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <UserInfoCard username={username} name={name} />
      </BrowserRouter>,
    );

    getByText(username);
    getByText(name);
  });
});
