/*
 * CS3099 Group A3
 */

import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserContext, defaultContext } from "../../contexts/user/UserContext";
import AccountMenu from "./AccountMenu";
import { BrowserRouter } from "react-router-dom";

const menuItems = ["Profile", "Settings", "Logout"];
const username = "foo";

test("Open and close account menu", async () => {
  const userContext = { ...defaultContext };
  userContext.details = { ...userContext.details, username };

  render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <AccountMenu />
      </UserContext.Provider>
    </BrowserRouter>,
  );

  for (let i = 0; i < menuItems.length; i++) {
    expect(screen.queryByText(menuItems[i])).toBeNull();
  }
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    for (let i = 0; i < menuItems.length; i++) {
      expect(screen.queryByText(menuItems[i])).not.toBeNull();
    }
  });
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    for (let i = 0; i < menuItems.length; i++) {
      expect(screen.queryByText(menuItems[i])).toBeNull();
    }
  });
});

test("Close account menu on click away", async () => {
  const userContext = { ...defaultContext };
  userContext.details = { ...userContext.details, username };

  render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <AccountMenu />
      </UserContext.Provider>
    </BrowserRouter>,
  );

  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.queryByText(menuItems[0])).not.toBeNull();
  });
  fireEvent.click(document);
  await waitFor(() => {
    expect(screen.queryByText(menuItems[0])).toBeNull();
  });
});

test("Tab pressed on open", async () => {
  const userContext = { ...defaultContext };
  userContext.details = { ...userContext.details, username };

  const { getByText } = render(
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <AccountMenu />
      </UserContext.Provider>
    </BrowserRouter>,
  );
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.queryByText(menuItems[0])).not.toBeNull();
  });
  fireEvent.keyDown(getByText(menuItems[0]), { key: "Tab", code: "Tab" });
  await waitFor(() => {
    expect(screen.queryByText(menuItems[0])).toBeNull();
  });
});
