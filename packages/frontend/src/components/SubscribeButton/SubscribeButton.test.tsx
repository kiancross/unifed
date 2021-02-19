/*
 * CS3099 Group A3
 */

import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import SubscribeButton, { SUBSCRIBE, UNSUBSCRIBE } from "./SubscribeButton";
import { MockedProvider } from "@apollo/client/testing";

test("Render SubscribeButton on unsubscribed community", async () => {
  const { getByText } = render(
    <MockedProvider>
      <SubscribeButton id={"foo"} server={"bar"} isSubscribed={false} />
    </MockedProvider>,
  );
  getByText("Subscribe");
});

test("Render SubscribeButton on subscribed community", async () => {
  const { getByText } = render(
    <MockedProvider>
      <SubscribeButton id={"foo"} server={"bar"} isSubscribed={true} />
    </MockedProvider>,
  );
  getByText("Subscribed");
});

test("Subscribe and unsubscribe", async () => {
  const mocks = [
    {
      request: {
        query: SUBSCRIBE,
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
        query: UNSUBSCRIBE,
        variables: { id: "foo", host: "bar" },
      },
      result: {
        data: {
          unsubscribe: true,
        },
      },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SubscribeButton id={"foo"} server={"bar"} isSubscribed={false} />
    </MockedProvider>,
  );

  fireEvent.click(getByText("Subscribe"));
  expect(getByText("Subscribed").closest("button")).toBeDisabled();
  await waitFor(() => {
    expect(getByText("Subscribed").closest("button")).not.toBeDisabled();
  });
  fireEvent.click(getByText("Subscribed"));
  expect(getByText("Subscribe").closest("button")).toBeDisabled();
  await waitFor(() => {
    expect(getByText("Subscribe").closest("button")).not.toBeDisabled();
  });
});
