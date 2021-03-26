/*
 * CS3099 Group A3
 */

import { render, screen } from "@testing-library/react";

import { RegistrationPage } from "../RegistrationPage";
import { BrowserMockProvider } from "../../../helpers";

test("RegistrationPage renders", () => {
  render(
    <BrowserMockProvider>
      <RegistrationPage />
    </BrowserMockProvider>,
  );

  expect(screen.getByText("Already a user? Login"));
});
