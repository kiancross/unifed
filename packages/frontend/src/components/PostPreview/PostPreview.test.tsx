/*
 * Copyright (C) 2021 Allan Mathew Chacko
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

import { MockedProvider } from "@apollo/client/testing";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { defaultUserContext, UserContext } from "../../contexts";
import { PostPreview } from "./PostPreview";
import { getAdminsQuery } from "../PostHeader";

const username = "testuser";
const title = "Test title";
const id = "foo";
const server = process.env.REACT_APP_INTERNAL_REFERENCE;
const community = "ham";
const body = "Test body";

const getAdminsMock = {
  request: {
    query: getAdminsQuery,
    variables: { id: community, host: server },
  },
  result: {
    data: {
      getCommunity: {
        admins: [{ id: username, host: "this" }],
      },
    },
  },
};

test("Renders correctly", async () => {
  const userContext = { ...defaultUserContext };
  userContext.details = { ...userContext.details, username };
  const { getAllByText, getByText, getByRole } = render(
    <MemoryRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider mocks={[getAdminsMock]} addTypename={false}>
          <PostPreview
            username={username}
            title={title}
            id={id}
            host={server}
            community={community}
            body={body}
          />
        </MockedProvider>
      </UserContext.Provider>
    </MemoryRouter>,
  );

  await waitFor(() => {
    getByRole("button", { name: "more options" });
  });
  await act(async () => {
    fireEvent.click(getByRole("button", { name: "more options" }));
  });
  await act(async () => {
    fireEvent.click(getByRole("menuitem", { name: "edit" }));
  });
  getByText(title);
  getAllByText(body);
  await act(async () => {
    fireEvent.click(getByRole("button", { name: "cancel" }));
  });
  expect(screen.queryByText(body)).toBeNull;
});
