import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import PostHeader, { DELETE_POST } from "./PostHeader";
import { MockedProvider } from "@apollo/client/testing";
import { UserContext } from "../App/UserContext";
import { BrowserRouter, Route } from "react-router-dom";

const username = "testuser";
const id = "123";
const host = "testserver";

const deletePostMock = {
  request: {
    query: DELETE_POST,
    variables: { id: id, host: host },
  },
  result: {
    data: {
      deletePost: true,
    },
  },
};

test("edit and delete succeed with valid user", async () => {
  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <UserContext.Provider value={username}>
        <MockedProvider mocks={[deletePostMock]} addTypename={false}>
          <PostHeader username={username} id={id} server={host} onToggleEdit={() => void 0} />
        </MockedProvider>
      </UserContext.Provider>
      <Route path="/"> Home Page </Route>
    </BrowserRouter>,
  );

  fireEvent.click(getByTestId("icon-button"));
  fireEvent.click(getByText("Edit"));
  fireEvent.click(getByTestId("icon-button"));
  await act(async () => {
    fireEvent.click(getByText("Delete"));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByText("Home Page"));
  });
});

test("action menu does not render with invalid user", async () => {
  const { getByText, queryByTestId } = render(
    <UserContext.Provider value="invalid">
      <MockedProvider mocks={[deletePostMock]} addTypename={false}>
        <PostHeader username={username} id={id} server={host} onToggleEdit={() => void 0} />
      </MockedProvider>
    </UserContext.Provider>,
  );

  expect(queryByTestId("icon-button")).toBeNull();
  getByText(username);
});

test("comment deletes", async () => {
  const { getByText, getByTestId } = render(
    <UserContext.Provider value={username}>
      <MockedProvider mocks={[deletePostMock]} addTypename={false}>
        <PostHeader
          isComment
          username={username}
          id={id}
          server={host}
          onToggleEdit={() => void 0}
        />
      </MockedProvider>
    </UserContext.Provider>,
  );

  getByText(username);
  fireEvent.click(getByTestId("icon-button"));
  await act(async () => {
    fireEvent.click(getByText("Delete"));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});

test("preview deletes", async () => {
  const { getByText, getByTestId } = render(
    <UserContext.Provider value={username}>
      <MockedProvider mocks={[deletePostMock]} addTypename={false}>
        <PostHeader
          isPreview
          username={username}
          id={id}
          server={host}
          onToggleEdit={() => void 0}
        />
      </MockedProvider>
    </UserContext.Provider>,
  );

  getByText(username);
  fireEvent.click(getByTestId("icon-button"));
  await act(async () => {
    fireEvent.click(getByText("Delete"));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});
