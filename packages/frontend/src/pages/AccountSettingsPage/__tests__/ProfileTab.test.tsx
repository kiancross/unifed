/*
 * Copyright (C) 2021 Allan Mathew Chacko
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { UserContext, getUserQuery, defaultUserContext } from "../../../contexts";
import { ProfileTab, changeNameQuery } from "../ProfileTab";

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
        query: changeNameQuery,
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
