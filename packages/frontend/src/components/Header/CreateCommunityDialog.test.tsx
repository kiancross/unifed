/*
 * CS3099 Group A3
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import CreateCommunityDialog from "./CreateCommunityDialog";

test("Open and close", async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <CreateCommunityDialog />
    </MockedProvider>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByRole("button", { name: "Add Community" }));
  });

  await waitFor(() => {
    screen.getByRole("button", { name: "Create" });
  });

  await waitFor(() => {
    userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  });

  await waitFor(() => {
    expect(screen.queryByRole("button", { name: "Create" })).toBeNull();
  });
});

test("Invalid form values", async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <CreateCommunityDialog />
    </MockedProvider>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByRole("button", { name: "Add Community" }));
  });

  await waitFor(() => {
    userEvent.click(screen.getByRole("button", { name: "Create" }));
  });

  await waitFor(() => {
    screen.getByText("Invalid ID");
    screen.getByText("Invalid Name");
    screen.getByText("Invalid Description");
  });
});

test("Valid form values", async () => {
  // TODO
});
