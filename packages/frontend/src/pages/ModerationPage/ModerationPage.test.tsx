/*
 * CS3099 Group A3
 */

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ModerationPage } from ".";
import { BrowserMockProvider } from "../../helpers";
import { getUnapprovedPostsQuery, approvePostsMutation, deletePostsMutation } from "./QueueTab";

const id1 = "id12345";
const testHost = "testHost";

const getUnapprovedDefaultMock = {
  request: {
    query: getUnapprovedPostsQuery,
  },
  result: {
    data: {
      getUnapprovedPosts: [
        {
          id: id1,
          title: "Test title",
          body: "body1",
          author: {
            id: "testuser1",
          },
          community: {
            id: "testCommunity",
          },
          parentPost: null,
          host: testHost,
        },
      ],
    },
  },
};

const approvePostsMock = (result: boolean) => {
  return {
    request: {
      query: approvePostsMutation,
      variables: {
        posts: [
          {
            id: id1,
            host: testHost,
          },
        ],
      },
    },
    result: {
      data: {
        approvePosts: result,
      },
    },
  };
};

const deletePostsMock = (result: boolean) => {
  return {
    request: {
      query: deletePostsMutation,
      variables: {
        posts: [
          {
            id: id1,
            host: testHost,
          },
        ],
      },
    },
    result: {
      data: {
        approvePosts: result,
      },
    },
  };
};

test("Render ModQueue", async () => {
  const mocks = [
    {
      request: {
        query: getUnapprovedPostsQuery,
      },
      result: {
        data: {
          getUnapprovedPosts: [],
        },
      },
    },
  ];

  const { getByText, queryByRole } = render(
    <BrowserMockProvider mocks={mocks}>
      <ModerationPage />
    </BrowserMockProvider>,
  );
  await act(async () => {
    fireEvent.click(getByText("QUEUE"));
  });
  await waitFor(() => {
    getByText("Approve");
    getByText("Remove");
  });
});

test("Cache only updated when approve succeeds", async () => {
  const mocks = [getUnapprovedDefaultMock, approvePostsMock(false), approvePostsMock(true)];

  const { getByText, queryByText } = render(
    <BrowserMockProvider mocks={mocks}>
      <ModerationPage />
    </BrowserMockProvider>,
  );

  await act(async () => {
    fireEvent.click(getByText("QUEUE"));
  });
  await waitFor(() => {
    getByText("Test title");
  });
  await act(async () => {
    fireEvent.click(screen.getByRole("checkbox", { name: "" }));
    fireEvent.click(getByText("Approve"));
  });
  queryByText("Test title");
  await act(async () => {
    fireEvent.click(getByText("Approve"));
  });
  expect(queryByText("Test title")).toBeNull();
});

test("Cache only updated when remove succeeds", async () => {
  const mocks = [getUnapprovedDefaultMock, deletePostsMock(false), deletePostsMock(true)];

  const { getByText, queryByText } = render(
    <BrowserMockProvider mocks={mocks}>
      <ModerationPage />
    </BrowserMockProvider>,
  );

  await act(async () => {
    fireEvent.click(getByText("QUEUE"));
  });
  await waitFor(() => {
    getByText("Test title");
  });
  await act(async () => {
    fireEvent.click(screen.getByRole("checkbox", { name: "" }));
    fireEvent.click(getByText("Remove"));
  });
  queryByText("Test title");
  await act(async () => {
    fireEvent.click(getByText("Remove"));
  });
  expect(queryByText("Test title")).toBeNull();
});
