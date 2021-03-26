/*
 * CS3099 Group A3
 */

import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { UserProvider, getUserQuery } from "../../../contexts";
import { AccountSettingsPage } from "../AccountSettingsPage";

const getUserMock = {
  request: { query: getUserQuery },
  result: {
    data: {
      getUser: { username: "foo", profile: { name: "bar" }, emails: [{ address: "baz" }] },
    },
  },
};

test("Render settings page", async () => {
  const mocks = [getUserMock];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <AccountSettingsPage />
      </UserProvider>
    </MockedProvider>,
  );

  await waitFor(() => {
    fireEvent.click(getByText("ACCOUNT"));
  });

  await waitFor(() => {
    getByText("foo");
    getByText("baz");
  });

  fireEvent.click(getByText("PROFILE"));

  await waitFor(() => {
    getByText("bar");
  });
});
