/*
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

import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import { BrowserMockProvider } from "../../helpers";
import { EmailVerificationPage } from "./EmailVerificationPage";

//For some reason the test was not finding the route without BrowserRouter
test("EmailVerification Renders", async () => {
  const homeMessage = "Home Page";
  render(
    <BrowserMockProvider path="/verify-email/:token" initialEntries={["/verify-email/123"]}>
      <BrowserRouter>
        <EmailVerificationPage />
        <Route path="/">{homeMessage}</Route>
      </BrowserRouter>
    </BrowserMockProvider>,
  );

  expect(screen.getByText(homeMessage));
});
