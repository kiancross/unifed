/*
 * CS3099 Group A3
 */

import AccountSettingsPage from "./AccountSettingsPage";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  UserProvider,
  UserContext,
  defaultContext,
  getUserQuery,
} from "../../contexts/user/UserContext";
import ProfileTab, { CHANGE_NAME } from "./ProfileTab";
import AccountTab from "./AccountTab";

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

test("Change name", async () => {
  const mocks = [
    getUserMock,
    {
      request: {
        query: CHANGE_NAME,
        variables: { name: "ham" },
      },
      result: {
        data: {
          updateUserProfile: true,
        },
      },
    },
  ];

  const userContext = { ...defaultContext };
  userContext.details = { ...userContext.details, profile: { name: "foo" } };
  userContext.refetch = jest.fn();

  const { getByTestId } = render(
    <UserContext.Provider value={userContext}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProfileTab name="foo" />
      </MockedProvider>
    </UserContext.Provider>,
  );
  fireEvent.click(getByTestId("change-name-button"));
  await waitFor(() => {
    fireEvent.change(getByTestId("change-name-input"), { target: { value: "ham" } });
    fireEvent.click(getByTestId("change-name-submit"));
  });
  await waitFor(() => {
    expect(userContext.refetch).toHaveBeenCalledTimes(1);
  });
});

test("Change password dialog", async () => {
  const { getByTestId } = render(<AccountTab username="foo" email="bar" />);
  fireEvent.click(getByTestId("change-password-button"));
  await waitFor(() => {
    getByTestId("old-password");
    getByTestId("new-password");
    getByTestId("confirm-password");
    getByTestId("confirm-password");
    getByTestId("change-password-submit");
  });
});
