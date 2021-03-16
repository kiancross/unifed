import EmailVerificationPage from "./EmailVerificationPage";
import { AllTheProviders } from "../../helpers/test";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

//For some reason the test was not finding the route without BrowserRouter
test("EmailVerification Renders", async () => {
  const homeMessage = "Home Page";
  render(
    <AllTheProviders path="/verify-email/:token" initialEntries={["/verify-email/123"]}>
      <BrowserRouter>
        <EmailVerificationPage />
        <Route path="/">{homeMessage}</Route>
      </BrowserRouter>
    </AllTheProviders>,
  );

  expect(screen.getByText(homeMessage));
});
