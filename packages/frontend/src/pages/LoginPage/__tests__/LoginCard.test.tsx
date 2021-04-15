/*
 * CS3099 Group A3
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { LoginCard } from "../LoginCard";

test("Login Card renders", async () => {
  const { getByRole, getByTestId } = render(
    <BrowserRouter>
      <LoginCard />
    </BrowserRouter>,
  );

  fireEvent.change(getByRole("textbox", { name: "email" }), {
    target: { value: "test@unifed.com" },
  });
  fireEvent.change(getByTestId("password"), {
    target: { value: "testpassword" },
  });

  await waitFor(() => {
    fireEvent.click(getByRole("button", { name: "submit" }));
  });
});
