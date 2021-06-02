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

import { render, screen, waitFor } from "@testing-library/react";

import { BrowserMockProvider } from "../../helpers";
import { UserProfilePage, getUsersPostsQuery } from "./UserProfilePage";

const host = "this";
const community = "all";
const user = "testuser";
const title = "Test Title";

test("UserProfilePage posts render with correct user", async () => {
  const getPostsMock = [
    {
      request: {
        query: getUsersPostsQuery,
        variables: {
          username: user,
        },
      },
      result: {
        data: {
          getAllPosts: [
            {
              id: "001",
              title: title,
              host: host,
              author: {
                id: user,
              },
              body: "Test Body",
            },
          ],
        },
      },
    },
  ];

  render(
    <BrowserMockProvider
      path="/user/:username"
      initialEntries={["/user/testuser"]}
      mocks={getPostsMock}
    >
      <UserProfilePage />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    expect(screen.getByText("Test Title"));
  });
});

test("UserProfilePage post does not render with incorrect user", async () => {
  const getPostsMock = [
    {
      request: {
        query: getUsersPostsQuery,
        variables: {
          username: user,
        },
      },
      result: {
        data: {
          getAllPosts: [
            {
              id: "001",
              title: title,
              host: host,
              author: {
                id: "invalidUser",
              },
              body: "Test Body",
            },
          ],
        },
      },
    },
  ];

  render(
    <BrowserMockProvider
      path="/user/:username"
      initialEntries={["/user/testuser"]}
      mocks={getPostsMock}
    >
      <UserProfilePage />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    expect(screen.queryByText("Test Title")).toBeNull;
  });
});

test("Error Message renders when error is returned", async () => {
  const getPostsMock = [
    {
      request: {
        query: getUsersPostsQuery,
        variables: {
          username: user,
        },
      },
    },
  ];

  render(
    <BrowserMockProvider
      path="/user/:username"
      initialEntries={["/user/testuser"]}
      mocks={getPostsMock}
    >
      <UserProfilePage />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    expect(
      screen.getByText("Your posts could not be retrieved at this time. Please try again later."),
    );
  });
});
