/*
 * CS3099 Group A3
 */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Comments, { GET_COMMENTS } from "./Comments";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor, screen } from "@testing-library/react";
import PostPage, { GET_POST } from "./PostPage";
import { AllTheProviders } from "../../helpers/test";
import Post from "./Post";

// 001 represents the main post
// 002-006 represent the comments
const ids = ["001", "002", "003", "004", "005", "006"];
const bodies = [
  "",
  "first comment",
  "nested comment to first",
  "third level nested comment",
  "fourth level nested comment",
  "fifth level nested comment",
];
const users = ["", "user2", "user3", "user4", "user5", "user6"];
const server = "testserver";
const id = "testId";
const title = "Test Title";
const body = "Test Body";
const authorId = "123";
const username = "testuser";

test("Display comments", async () => {
  const reqres = (
    req_id: string,
    req_server: string,
    res_id: string,
    res_body: string,
    res_auth: string,
  ) => {
    return {
      request: {
        query: GET_COMMENTS,
        variables: { id: req_id, server: req_server },
      },
      result: {
        data: {
          getPost: {
            children: [
              {
                id: res_id,
                body: res_body,
                author: {
                  id: res_auth,
                },
              },
            ],
          },
        },
      },
    };
  };
  const getCommentsMocks = [
    reqres(ids[0], server, ids[1], bodies[1], users[1]),
    reqres(ids[1], server, ids[2], bodies[2], users[2]),
    reqres(ids[2], server, ids[3], bodies[3], users[3]),
    reqres(ids[3], server, ids[4], bodies[4], users[4]),
    reqres(ids[4], server, ids[5], bodies[5], users[5]),
    {
      request: {
        query: GET_COMMENTS,
        variables: { id: ids[5], server: server },
      },
      result: {
        data: {
          getPost: {
            children: [],
          },
        },
      },
    },
  ];

  const { getByText } = render(
    <BrowserRouter>
      <MockedProvider mocks={getCommentsMocks} addTypename={false}>
        <Comments parentId={ids[0]} server={server} grids={11} />
      </MockedProvider>
    </BrowserRouter>,
  );

  for (let i = 1; i < users.length; i++) {
    await waitFor(() => {
      getByText(users[i]);
      getByText(bodies[i]);
    });
  }
});

test("PostPage renders", async () => {
  const getPostMock = [
    {
      request: {
        query: GET_POST,
        variables: {
          id: id,
          host: server,
        },
      },
      result: {
        data: {
          getPost: {
            title: title,
            body: body,
            author: {
              id: authorId,
            },
          },
        },
      },
    },
  ];

  const { getByText } = render(
    <AllTheProviders
      path="/instances/:server/communities/:community/posts/:post"
      initialEntries={["/instances/testserver/communities/this/posts/testId"]}
      mocks={getPostMock}
    >
      <PostPage />
    </AllTheProviders>,
  );

  await waitFor(() => {
    getByText(title);
  });
});

test("Render Comment", async () => {
  render(
    <AllTheProviders>
      <Post username={username} id={id} body={body} server={server} title={""} />
    </AllTheProviders>,
  );

  expect(screen.getByText("Comment"));
});
