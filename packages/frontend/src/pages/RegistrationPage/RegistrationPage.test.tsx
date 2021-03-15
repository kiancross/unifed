import { render, screen, waitFor } from "@testing-library/react";
import RegistrationPage from "./RegistrationPage";
import RegistrationCard from "./RegistrationCard";
import { AllTheProviders } from "../../helpers/test";
import userEvent from "@testing-library/user-event";

test("RegistrationPage renders", () => {
  render(
    <AllTheProviders>
      <RegistrationPage />
    </AllTheProviders>,
  );

  expect(screen.getByText("Already a user? Login"));
});

test("RegistrationCard renders", async () => {
  render(
    <AllTheProviders>
      <RegistrationCard />
    </AllTheProviders>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByText("Create Account"));
  });
});
