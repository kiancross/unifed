/*
 * CS3099 Group A3
 */

import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

import { UserContext, defaultUserContext } from "../../contexts";
import { App } from "./App";

test("Loading user", () => {
  const { queryByText } = render(
    <UserContext.Provider value={defaultUserContext}>
      <App />
    </UserContext.Provider>,
  );

  expect(queryByText("unifed")).toBeNull();
});

test("Loaded user", () => {
  const userContext = { ...defaultUserContext };
  userContext.details = { ...userContext.details, username: "foo" };

  window.history.pushState({}, "foo", "/404");

  const consoleError = console.error;
  console.error = jest.fn();

  const { getByText } = render(
    <MockedProvider>
      <UserContext.Provider value={userContext}>
        <App />
      </UserContext.Provider>
    </MockedProvider>,
    { wrapper: BrowserRouter },
  );

  console.error = consoleError;

  getByText("404 Page Not Found");
});
