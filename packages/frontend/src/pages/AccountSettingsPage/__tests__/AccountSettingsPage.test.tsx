/*
 * Copyright (C) 2021 Kian Cross
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
