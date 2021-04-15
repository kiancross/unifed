/*
 * CS3099 Group A3
 */

import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { PasswordResetRequestCard } from "../PasswordResetRequestCard";

const validEmail = "foo@bar.com";

test("Valid email", async () => {
  const RESET_PASS_EMAIL = gql`
    mutation SendResetPasswordEmail($email: String!) {
      sendResetPasswordEmail(email: $email)
    }
  `;

  const mocks = [
    {
      request: {
        query: RESET_PASS_EMAIL,
        variables: { email: validEmail },
      },
      result: {
        data: {
          sendResetPasswordEmail: true,
        },
      },
    },
  ];

  const { getByRole } = render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PasswordResetRequestCard />
      </MockedProvider>
    </MemoryRouter>,
  );

  fireEvent.change(getByRole("textbox", { name: "email" }), { target: { value: validEmail } });
  await act(async () => {
    fireEvent.click(getByRole("button", { name: "submit" }));
  });
});

// Shows warning that needs to be fixed
test("Invalid email", async () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <PasswordResetRequestCard />
    </MemoryRouter>,
  );
  fireEvent.change(getByRole("textbox", { name: "email" }), { target: { value: "foo" } });
  await act(async () => {
    fireEvent.click(getByRole("button", { name: "submit" }));
  });
  getByText("Invalid email");
});
