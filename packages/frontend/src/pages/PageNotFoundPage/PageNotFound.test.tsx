/*
 * CS3099 Group A3
 */

import { act, fireEvent, render, screen } from "@testing-library/react";
import { Route } from "react-router-dom";

import { BrowserMockProvider } from "../../helpers";
import { PageNotFoundPage } from "./PageNotFoundPage";

test("PageNotFoundPage button works", () => {
  const { getByText } = render(
    <BrowserMockProvider>
      <PageNotFoundPage />
      <Route path="/">Home Page</Route>
    </BrowserMockProvider>,
  );

  expect(screen.getAllByText("404 Page Not Found"));
  expect(screen.getAllByText("Return Home"));

  act(() => {
    fireEvent.click(getByText("Return Home"));
    expect(screen.getByText("Home Page"));
  });
});
