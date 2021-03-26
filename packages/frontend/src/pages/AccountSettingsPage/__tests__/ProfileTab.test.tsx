/*
 * CS3099 Group A3
 */

import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { UserContext, getUserQuery, defaultUserContext } from "../../../contexts";
import { ProfileTab, CHANGE_NAME } from "../ProfileTab";

const getUserMock = {
  request: { query: getUserQuery },
  result: {
    data: {
      getUser: { username: "foo", profile: { name: "bar" }, emails: [{ address: "baz" }] },
    },
  },
};

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

  const userContext = { ...defaultUserContext };
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
