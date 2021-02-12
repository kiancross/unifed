/*
 * CS3099 Group A3
 */

import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AccountMenu from "./AccountMenu";

const user = "testuser";
const menuItems = ["Profile", "Settings", "Logout"];
const onLogout = jest.fn();

test("Open and close account menu", async () => {
  render(<AccountMenu username={user} onLogout={onLogout} />);
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
  render(<AccountMenu username={user} onLogout={onLogout} />);
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.queryByText(menuItems[0])).not.toBeNull();
  });
  fireEvent.click(document);
  await waitFor(() => {
    expect(screen.queryByText(menuItems[0])).toBeNull();
  });
});

test("Test logout function gets called", async () => {
  const { getByText } = render(<AccountMenu username={user} onLogout={onLogout} />);
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.queryByText(menuItems[0])).not.toBeNull();
  });
  fireEvent.click(getByText(menuItems[2]));
  expect(onLogout).toHaveBeenCalledTimes(1);
});
