/*
 * CS3099 Group A3
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
