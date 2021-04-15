/*
 * CS3099 Group A3
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserMockProvider } from "../../../helpers";
import { RegistrationCard } from "../RegistrationCard";

test("RegistrationCard renders", async () => {
  render(
    <BrowserMockProvider>
      <RegistrationCard />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByRole("button", { name: "submit" }));
  });
});
