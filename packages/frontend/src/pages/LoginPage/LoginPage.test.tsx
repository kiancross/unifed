import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./LoginPage";
import LoginCard from "./LoginCard";
import { BrowserRouter } from "react-router-dom";

test("Login Page renders", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>,
  );

  expect(screen.getByText("Register an account"));
});

test("Login Card renders", () => {
  const { getByText } = render(
    <BrowserRouter>
      <LoginCard />
    </BrowserRouter>,
  );

  fireEvent.click(getByText("email"));
});
