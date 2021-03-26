/*
 * CS3099 Group A3
 */

import { MockedProvider } from "@apollo/client/testing";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { defaultUserContext, UserContext } from "../../contexts";
import { PostPreview } from "./PostPreview";

const username = "testuser";
const title = "Test title";
const id = "foo";
const server = process.env.REACT_APP_INTERNAL_REFERENCE;
const community = "ham";
const body = "Test body";

test("Renders correctly", async () => {
  const userContext = { ...defaultUserContext };
  userContext.details = { ...userContext.details, username };
  const { getAllByText, getByText, getByTestId } = render(
    <MemoryRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider>
          <PostPreview
            username={username}
            title={title}
            id={id}
            server={server}
            community={community}
            body={body}
          />
        </MockedProvider>
      </UserContext.Provider>
    </MemoryRouter>,
  );
  await act(async () => {
    fireEvent.click(getByTestId("icon-button"));
  });
  await act(async () => {
    fireEvent.click(getByText("Edit"));
  });
  getByText(title);
  getAllByText(body);
  await act(async () => {
    fireEvent.click(getByText("Cancel"));
  });
  expect(screen.queryByText(body)).toBeNull;
});
