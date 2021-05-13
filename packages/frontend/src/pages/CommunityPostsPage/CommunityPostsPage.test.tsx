/*
 * Copyright (C) 2021 Robert Mardall
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

import { render, screen, waitFor } from "@testing-library/react";

import { BrowserMockProvider } from "../../helpers";
import { CommunityPostsPage, getPostsQuery } from "./CommunityPostsPage";

test("CommunityPostsPage renders", async () => {
  const community = "general";
  const host = "this";

  const getPostsMock = [
    {
      request: {
        query: getPostsQuery,
        variables: {
          community: community,
          host: host,
        },
      },
      result: {
        data: {
          getPosts: [
            {
              id: "001",
              title: "Test Post",
              approved: true,
              author: {
                id: "authorId",
              },
              body: "test body",
            },
          ],
          getCommunity: {
            host: host,
            id: community,
            title: "Test Community",
            description: "this is a test community",
            admins: [{ id: "adminID" }],
          },
          getSubscriptions: [
            {
              id: community,
              host: host,
            },
          ],
        },
      },
    },
  ];
  render(
    <BrowserMockProvider
      path="/instances/:host/communities/:community/posts"
      initialEntries={["/instances/this/communities/general/posts"]}
      mocks={getPostsMock}
    >
      <CommunityPostsPage />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "join community call" }));
  });
});

test("CommunityPostsPage error message renders", async () => {
  const community = "invalid";
  const host = "this";

  const getPostsMock = [
    {
      request: {
        query: getPostsQuery,
        variables: {
          community: community,
          host: host,
        },
      },
      result: {
        data: {
          getPosts: [
            {
              id: "001",
              title: "Test Post",
              approved: true,
              author: {
                id: "authorId",
              },
              body: "test body",
            },
          ],
          getCommunity: {
            host: host,
            id: community,
            title: "Test Community",
            description: "this is a test community",
          },
          getSubscriptions: [
            {
              id: community,
              host: host,
            },
          ],
        },
      },
    },
  ];
  render(
    <BrowserMockProvider
      path="/instances/:host/communities/:community/posts"
      initialEntries={["/instances/this/communities/general/posts"]}
      mocks={getPostsMock}
    >
      <CommunityPostsPage />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    expect(screen.getByText("The posts from this community could not be retrieved."));
  });
});
