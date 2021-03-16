/*
 * CS3099 Group A3
 */

import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { act, fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import PasswordResetRequestCard from "./PasswordResetRequestCard";
import PasswordResetRequestPage from "./PasswordResetRequestPage";

const validEmail = "foo@bar.com";

test("Return to login redirects correctly", async () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  const { getByTestId } = render(
    <Router history={history}>
      <PasswordResetRequestPage />
    </Router>,
  );

  fireEvent.click(getByTestId("login-return-button"));
  expect(history.push).toHaveBeenCalledWith("/login");
});

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

  const { getByTestId } = render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PasswordResetRequestCard />
      </MockedProvider>
    </MemoryRouter>,
  );

  fireEvent.change(getByTestId("email-input"), { target: { value: validEmail } });
  await act(async () => {
    fireEvent.click(getByTestId("email-submit"));
  });
});

// Shows warning that needs to be fixed
test("Invalid email", async () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <PasswordResetRequestCard />
    </MemoryRouter>,
  );
  fireEvent.change(getByTestId("email-input"), { target: { value: "foo" } });
  await act(async () => {
    fireEvent.click(getByTestId("email-submit"));
  });
  getByText("Invalid email");
});
