/*
 * CS3099 Group A3
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
