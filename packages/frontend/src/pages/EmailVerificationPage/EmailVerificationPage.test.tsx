/*
 * CS3099 Group A3
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
