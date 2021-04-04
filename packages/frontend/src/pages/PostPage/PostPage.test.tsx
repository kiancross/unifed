/*
 * CS3099 Group A3
 */

import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor, screen } from "@testing-library/react";

import { BrowserMockProvider } from "../../helpers";
import { PostPage, GET_POST } from "./PostPage";
import { Comments, GET_COMMENTS } from "./Comments";
import { Post } from "./Post";
import { GET_ADMINS } from "../../components/PostHeader";

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
const community = "community";

const getAdminsMock = {
  request: {
    query: GET_ADMINS,
    variables: { id: community, host: server },
  },
  result: {
    data: {
      getCommunity: {
        admins: [{ id: username, host: server }],
      },
    },
  },
};

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
            id: id,
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
            id: id,
            children: [],
          },
        },
      },
    },
    getAdminsMock,
  ];

  const { getByText } = render(
    <BrowserRouter>
      <MockedProvider mocks={getCommentsMocks} addTypename={false}>
        <Comments community={community} parentId={ids[0]} server={server} grids={11} />
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
  const getPostMock = {
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
          id: id,
          title: title,
          body: body,
          author: {
            id: authorId,
          },
        },
      },
    },
  };

  const { getByText } = render(
    <BrowserMockProvider
      path="/instances/:server/communities/:community/posts/:post"
      initialEntries={["/instances/testserver/communities/community/posts/testId"]}
      mocks={[getPostMock, getAdminsMock]}
    >
      <PostPage />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    getByText(title);
  });
});

test("Render Comment", async () => {
  render(
    <BrowserMockProvider mocks={[getAdminsMock]}>
      <Post
        community={community}
        username={username}
        id={id}
        body={body}
        server={server}
        title={""}
      />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    expect(screen.getByText("Comment"));
  });
});
