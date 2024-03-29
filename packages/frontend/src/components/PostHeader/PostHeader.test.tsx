/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Allan Mathew Chacko
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

import { render, fireEvent, act, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

import { UserContext, defaultUserContext } from "../../contexts";
import { PostHeader, deletePostQuery, getAdminsQuery, reportPostQuery } from "./PostHeader";

const username = "testuser";
const id = "123";
const host = "this";
const community = "community";

const deletePostMock = {
  request: {
    query: deletePostQuery,
    variables: { id: id, host: host },
  },
  result: {
    data: {
      deletePost: true,
    },
  },
};

const reportPostMock = {
  request: {
    query: reportPostQuery,
    variables: { id: id, host: host },
  },
  result: {
    data: {
      reportPost: true,
    },
  },
};

const getAdminsMock = {
  request: {
    query: getAdminsQuery,
    variables: { id: community, host: host },
  },
  result: {
    data: {
      getCommunity: {
        admins: [{ id: username, host: "this" }],
      },
    },
  },
};

const mocks = [getAdminsMock, deletePostMock, reportPostMock];

test("Edit and delete succeed with valid user", async () => {
  const userContext = { ...defaultUserContext };
  userContext.details = { ...userContext.details, username };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PostHeader
            community={community}
            username={username}
            id={id}
            host={host}
            onToggleEdit={() => void 0}
          />
        </MockedProvider>
      </UserContext.Provider>
      <Route path="/"> Home Page </Route>
    </BrowserRouter>,
  );

  await waitFor(() => {
    fireEvent.click(getByTestId("icon-button"));
    fireEvent.click(getByText("Edit"));
    fireEvent.click(getByTestId("icon-button"));
  });

  await act(async () => {
    fireEvent.click(getByText("Delete"));
  });

  expect(screen.getByText("Home Page"));
});

test("Report button works for other users", async () => {
  const userContext = { ...defaultUserContext };
  userContext.details = { ...userContext.details, username: "otheruser" };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PostHeader
            community={community}
            username={username}
            id={id}
            host={host}
            onToggleEdit={() => void 0}
          />
        </MockedProvider>
      </UserContext.Provider>
    </BrowserRouter>,
  );

  await waitFor(() => {
    fireEvent.click(getByTestId("icon-button"));
    fireEvent.click(getByText("Report"));
  });
});

test("Comment deletes", async () => {
  const userContext = { ...defaultUserContext };
  userContext.details = { ...userContext.details, username };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PostHeader
            community={community}
            username={username}
            id={id}
            host={host}
            onToggleEdit={() => void 0}
          />
        </MockedProvider>
      </UserContext.Provider>
    </BrowserRouter>,
  );

  await waitFor(() => {
    getByText(username);
    fireEvent.click(getByTestId("icon-button"));
  });

  await act(async () => {
    fireEvent.click(getByText("Delete"));
  });
});

test("Preview deletes", async () => {
  const userContext = { ...defaultUserContext };
  userContext.details = { ...userContext.details, username };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PostHeader
            community={community}
            isPreview
            username={username}
            id={id}
            host={host}
            onToggleEdit={() => void 0}
          />
        </MockedProvider>
      </UserContext.Provider>
    </BrowserRouter>,
  );

  await waitFor(() => {
    getByText(username);
    fireEvent.click(getByTestId("icon-button"));
  });

  await act(async () => {
    fireEvent.click(getByText("Delete"));
  });
});
