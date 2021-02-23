import { act, fireEvent, render, screen } from "@testing-library/react";
import PageNotFoundPage from "./PageNotFoundPage";
import { AllTheProviders } from "../../helpers/test";
import { Route } from "react-router-dom";

test("PageNotFoundPage button works", () => {
  const { getByText } = render(
    <AllTheProviders>
      <PageNotFoundPage />
      <Route path="/">Home Page</Route>
    </AllTheProviders>,
  );

  expect(screen.getAllByText("404 Page Not Found"));
  expect(screen.getAllByText("Return Home"));

  act(() => {
    fireEvent.click(getByText("Return Home"));
    expect(screen.getByText("Home Page"));
  });
});
