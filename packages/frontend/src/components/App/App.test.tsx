/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Lewis Mazzei
 * Copyright (C) 2020 Robert Mardall
 * Copyright (C) 2020 Allan Mathew Chacko
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
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

import { UserContext, defaultUserContext } from "../../contexts";
import { App } from "./App";

test("Loading user", () => {
  const { queryByText } = render(
    <UserContext.Provider value={defaultUserContext}>
      <App />
    </UserContext.Provider>,
  );

  expect(queryByText("unifed")).toBeNull();
});

test("Loaded user", () => {
  const userContext = { ...defaultUserContext };
  userContext.details = { ...userContext.details, username: "foo" };

  window.history.pushState({}, "foo", "/404");

  const consoleError = console.error;
  console.error = jest.fn();

  const { getByText } = render(
    <MockedProvider>
      <UserContext.Provider value={userContext}>
        <App />
      </UserContext.Provider>
    </MockedProvider>,
    { wrapper: BrowserRouter },
  );

  console.error = consoleError;

  getByText("404 Page Not Found");
});
