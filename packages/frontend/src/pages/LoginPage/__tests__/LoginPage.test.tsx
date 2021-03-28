/*
 * CS3099 Group A3
 */

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { LoginPage } from "../LoginPage";

test("Login Page renders", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>,
  );

  expect(screen.getByText("Register an account"));
});
