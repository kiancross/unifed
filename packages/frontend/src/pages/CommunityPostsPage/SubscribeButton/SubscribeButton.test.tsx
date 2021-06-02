/*
 * Copyright (C) 2021 Allan Mathew Chacko
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Lewis Mazzei
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

import { render, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { SubscribeButton, subscribeQuery, unsubscribeQuery } from "./SubscribeButton";

test("Render SubscribeButton on unsubscribed community", async () => {
  const { getByRole } = render(
    <MockedProvider>
      <SubscribeButton id={"foo"} host={"bar"} isSubscribed={false} />
    </MockedProvider>,
  );
  getByRole("button", { name: "subscribe" });
});

test("Render SubscribeButton on subscribed community", async () => {
  const { getByRole } = render(
    <MockedProvider>
      <SubscribeButton id={"foo"} host={"bar"} isSubscribed={true} />
    </MockedProvider>,
  );
  getByRole("button", { name: "unsubscribe" });
});

test("Subscribe and unsubscribe", async () => {
  const mocks = [
    {
      request: {
        query: subscribeQuery,
        variables: { id: "foo", host: "bar" },
      },
      result: {
        data: {
          subscribe: true,
        },
      },
    },
    {
      request: {
        query: unsubscribeQuery,
        variables: { id: "foo", host: "bar" },
      },
      result: {
        data: {
          unsubscribe: true,
        },
      },
    },
  ];

  const { getByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SubscribeButton id={"foo"} host={"bar"} isSubscribed={false} />
    </MockedProvider>,
  );

  fireEvent.click(getByRole("button", { name: "subscribe" }));
  expect(getByRole("button", { name: "unsubscribe" }).closest("button")).toBeDisabled();
  await waitFor(() => {
    expect(getByRole("button", { name: "unsubscribe" }).closest("button")).not.toBeDisabled();
  });
  fireEvent.click(getByRole("button", { name: "unsubscribe" }));
  expect(getByRole("button", { name: "subscribe" }).closest("button")).toBeDisabled();
  await waitFor(() => {
    expect(getByRole("button", { name: "subscribe" }).closest("button")).not.toBeDisabled();
  });
});
