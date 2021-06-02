/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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

import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserMockProvider } from "../../../helpers";
import { SearchInput, getCommunitiesQuery } from "./SearchInput";

const title = "Test Community";
const id = "testId";
const host = "this host";

const getCommunitiesMock = [
  {
    request: {
      query: getCommunitiesQuery,
      variables: {
        host: host,
      },
    },
    result: {
      data: {
        getCommunities: [{ id: id, title: title }],
      },
    },
  },
];

test("SearchBar types", async () => {
  const { getByTestId } = render(
    <BrowserMockProvider mocks={getCommunitiesMock}>
      <SearchInput />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByTestId("searchbar"));
  });

  await waitFor(() => {
    userEvent.type(screen.getByRole("textbox"), host);
  });

  await waitFor(() => {
    userEvent.type(getByTestId("autocomplete"), "{arrowdown}");
  });

  await waitFor(() => {
    userEvent.type(getByTestId("autocomplete"), "{enter}");
  });
});
