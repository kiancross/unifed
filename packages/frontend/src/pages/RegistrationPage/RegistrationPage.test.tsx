import { render, screen } from "@testing-library/react";
import React from "react";
import RegistrationPage from "./RegistrationPage";
import RegistrationCard from "./RegistrationCard";
import { AllTheProviders } from "../../helpers/test";

test("RegistrationPage renders", () => {
  render(
    <AllTheProviders>
      <RegistrationPage />
    </AllTheProviders>,
  );

  expect(screen.getByText("Already a user? Login"));
});

test("RegistrationCard", () => {
  render(
    <AllTheProviders>
      <RegistrationCard />
    </AllTheProviders>,
  );

  expect(screen.getByText("Create Account"));
});
