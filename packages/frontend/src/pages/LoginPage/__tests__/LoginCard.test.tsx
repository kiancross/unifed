/*
 * CS3099 Group A3
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { LoginCard } from "../LoginCard";

test("Login Card renders", async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <LoginCard />
    </BrowserRouter>,
  );

  expect(screen.getByText("Email"));
  expect(screen.getAllByText("Password"));

  fireEvent.change(getByTestId("email"), { target: { value: "test@unifed.com" } });
  fireEvent.change(getByTestId("password"), { target: { value: "testpassword" } });

  await waitFor(() => {
    fireEvent.click(getByTestId("submit"));
  });
});
