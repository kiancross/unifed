import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
