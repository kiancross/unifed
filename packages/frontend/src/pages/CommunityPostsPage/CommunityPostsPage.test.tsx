import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { AllTheProviders } from "../../helpers/test";
import CommunityPostsPage, { GET_POSTS } from "./CommunityPostsPage";

test("CommunityPostsPage renders", async () => {
  const community = "general";
  const host = "this";

  const getPostsMock = [
    {
      request: {
        query: GET_POSTS,
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
    <AllTheProviders
      path="/instances/:server/communities/:community/posts"
      initialEntries={["/instances/this/communities/general/posts"]}
      mocks={getPostsMock}
    >
      <CommunityPostsPage />
    </AllTheProviders>,
  );

  await waitFor(() => {
    expect(screen.getByText("Join Community Call"));
  });
});

test("CommunityPostsPage error message renders", async () => {
  const community = "invalid";
  const host = "this";

  const getPostsMock = [
    {
      request: {
        query: GET_POSTS,
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
    <AllTheProviders
      path="/instances/:server/communities/:community/posts"
      initialEntries={["/instances/this/communities/general/posts"]}
      mocks={getPostsMock}
    >
      <CommunityPostsPage />
    </AllTheProviders>,
  );

  await waitFor(() => {
    expect(screen.getByText("The posts from this community could not be retrieved."));
  });
});
