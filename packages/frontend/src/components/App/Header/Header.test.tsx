/*
 * Copyright (C) 2021 Allan Mathew Chacko
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { BrowserMockProvider } from "../../../helpers";
import { UserContext, defaultUserContext } from "../../../contexts";
import { AccountMenu } from "./AccountMenu";
import { Header } from "./Header";

const menuItems = ["Profile", "Moderation", "Settings", "Logout"];
const username = "foo";

const userContext = { ...defaultUserContext };
userContext.details = { ...userContext.details, username };

test("Open and close account menu", async () => {
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

test("Header with no userContext", async () => {
  render(
    <BrowserMockProvider>
      <AccountMenu />
    </BrowserMockProvider>,
  );

  expect(screen.queryByRole("button")).toBeNull;
});

test("Click DarkMode", async () => {
  const mockFn = jest.fn();

  render(
    <BrowserMockProvider>
      <UserContext.Provider value={userContext}>
        <Header onThemeChange={mockFn} darkMode={false} />
      </UserContext.Provider>
    </BrowserMockProvider>,
  );

  fireEvent.click(screen.getByTestId("dark-button"));
});

test("DarkMode on", async () => {
  const mockFn = jest.fn();

  render(
    <BrowserMockProvider>
      <UserContext.Provider value={userContext}>
        <Header onThemeChange={mockFn} darkMode={true} />
      </UserContext.Provider>
    </BrowserMockProvider>,
  );

  fireEvent.click(screen.getByTestId("dark-button"));
});

test("Header with no userContext", async () => {
  const mockFn = jest.fn();

  render(
    <BrowserMockProvider>
      <Header onThemeChange={mockFn} darkMode={false} />
    </BrowserMockProvider>,
  );

  expect(screen.queryByTestId("dark-button")).toBeNull;
});
