/*
 * CS3099 Group A3
 */

import React from "react";
import AccountSettingsPage, { GET_USER } from "./AccountSettingsPage";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from "@testing-library/react";

const email = "testemail@test.com";
const user = "testuser";
const name = "John Smith";

test("Render settings page", async () => {
  const getUserMock = [
    {
      request: {
        query: GET_USER,
        variables: {},
      },
      result: {
        data: {
          getUser: {
            emails: [
              {
                address: email,
              },
            ],
            username: user,
            profile: {
              name: name,
            },
          },
        },
      },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={getUserMock} addTypename={false}>
      <AccountSettingsPage />
    </MockedProvider>,
  );

  // fireEvent.click(getByText("ACCOUNT"));
  // await waitFor(() => {
  //   getByText(user);
  //   getByText(email);
  // });
  // fireEvent.click(getByText("PROFILE"));
  // await waitFor(() => {
  //   getByText(name);
  // });
});
