/*
 * CS3099 Group A3
 */

import { render, screen, waitFor } from "@testing-library/react";

import { BrowserMockProvider } from "../../helpers";
import { UserProfilePage, GET_POSTS } from "./UserProfilePage";

const host = "this";
const community = "all";
const user = "testuser";
const title = "Test Title";

test("UserProfilePage posts render with correct user", async () => {
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

test("UserProfilePage post does not render with incorrect user", async () => {
  const getPostsMock = [
    {
      request: {
        query: GET_POSTS,
        variables: {
          id: community,
          host: host,
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
    expect(screen.getByText("Error!"));
  });
});
