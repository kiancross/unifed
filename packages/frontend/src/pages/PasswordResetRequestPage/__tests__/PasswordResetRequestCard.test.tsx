/*
 * Copyright (C) 2021 Allan Mathew Chacko
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
