/*
 * CS3099 Group A3
 */

import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import PostHeader, { DELETE_POST } from "./PostHeader";
import { MockedProvider } from "@apollo/client/testing";
import { UserContext, defaultContext } from "../../contexts/user";
import { BrowserRouter, Route } from "react-router-dom";

const username = "testuser";
const id = "123";
const host = "this";

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

test("Edit and delete succeed with valid user", async () => {
  const userContext = { ...defaultContext };
  userContext.details = { ...userContext.details, username };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
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
  });

  expect(screen.getByText("Home Page"));
});

test("Action menu does not render with invalid user", async () => {
  const userContext = { ...defaultContext };
  userContext.details = { ...userContext.details, username: "invalid" };

  const { getByText, queryByTestId } = render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider mocks={[deletePostMock]} addTypename={false}>
          <PostHeader username={username} id={id} server={host} onToggleEdit={() => void 0} />
        </MockedProvider>
      </UserContext.Provider>
    </BrowserRouter>,
  );

  expect(queryByTestId("icon-button")).toBeNull();
  getByText(username);
});

test("Comment deletes", async () => {
  const userContext = { ...defaultContext };
  userContext.details = { ...userContext.details, username };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider mocks={[deletePostMock]} addTypename={false}>
          <PostHeader
            isComment
            username={username}
            id={id}
            server={host}
            onToggleEdit={() => void 0}
          />
        </MockedProvider>
      </UserContext.Provider>
    </BrowserRouter>,
  );

  getByText(username);
  fireEvent.click(getByTestId("icon-button"));

  await act(async () => {
    fireEvent.click(getByText("Delete"));
  });
});

test("Preview deletes", async () => {
  const userContext = { ...defaultContext };
  userContext.details = { ...userContext.details, username };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider mocks={[deletePostMock]} addTypename={false}>
          <PostHeader
            isPreview
            username={username}
            id={id}
            server={host}
            onToggleEdit={() => void 0}
          />
        </MockedProvider>
      </UserContext.Provider>
    </BrowserRouter>,
  );

  getByText(username);
  fireEvent.click(getByTestId("icon-button"));

  await act(async () => {
    fireEvent.click(getByText("Delete"));
  });
});
