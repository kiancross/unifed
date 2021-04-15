/*
 * CS3099 Group A3
 */

import { MockedProvider } from "@apollo/client/testing";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { defaultUserContext, UserContext } from "../../contexts";
import { PostPreview } from "./PostPreview";
import { getAdminsQuery } from "../PostHeader";

const username = "testuser";
const title = "Test title";
const id = "foo";
const server = process.env.REACT_APP_INTERNAL_REFERENCE;
const community = "ham";
const body = "Test body";

const getAdminsMock = {
  request: {
    query: getAdminsQuery,
    variables: { id: community, host: server },
  },
  result: {
    data: {
      getCommunity: {
        admins: [{ id: username, host: "this" }],
      },
    },
  },
};

test("Renders correctly", async () => {
  const userContext = { ...defaultUserContext };
  userContext.details = { ...userContext.details, username };
  const { getAllByText, getByText, getByRole } = render(
    <MemoryRouter>
      <UserContext.Provider value={userContext}>
        <MockedProvider mocks={[getAdminsMock]} addTypename={false}>
          <PostPreview
            username={username}
            title={title}
            id={id}
            host={server}
            community={community}
            body={body}
          />
        </MockedProvider>
      </UserContext.Provider>
    </MemoryRouter>,
  );

  await waitFor(() => {
    getByRole("button", { name: "more options" });
  });
  await act(async () => {
    fireEvent.click(getByRole("button", { name: "more options" }));
  });
  await act(async () => {
    fireEvent.click(getByRole("menuitem", { name: "edit" }));
  });
  getByText(title);
  getAllByText(body);
  await act(async () => {
    fireEvent.click(getByRole("button", { name: "cancel" }));
  });
  expect(screen.queryByText(body)).toBeNull;
});
