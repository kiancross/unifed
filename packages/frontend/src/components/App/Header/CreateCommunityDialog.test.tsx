/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Lewis Mazzei
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

import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { GraphQLError } from "graphql";
import { MockedProvider } from "@apollo/client/testing";
import { CreateCommunityDialog, createCommunityQuery } from "./CreateCommunityDialog";

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
  const history = createMemoryHistory();
  history.push = jest.fn();
  const mocks = [
    {
      request: {
        query: createCommunityQuery,
        variables: { id: "CS3099", title: "CS3099", description: "Team Project" },
      },
      result: {
        data: {
          createCommunity: [true],
        },
      },
    },
  ];

  const { getByTestId } = render(
    <Router history={history}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateCommunityDialog />
      </MockedProvider>
    </Router>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByRole("button", { name: "Add Community" }));
  });

  await waitFor(() => {
    fireEvent.change(getByTestId("id"), { target: { value: "CS3099" } });
  });

  await waitFor(() => {
    fireEvent.change(getByTestId("name"), { target: { value: "CS3099" } });
  });

  await waitFor(() => {
    fireEvent.change(getByTestId("description"), { target: { value: "Team Project" } });
  });

  await waitFor(() => {
    userEvent.click(screen.getByRole("button", { name: "Create" }));
  });

  await waitFor(() => {
    expect(history.push).toHaveBeenCalledWith("/instances/this/communities/CS3099/posts");
  });
});

test("Error", async () => {
  const mocks = [
    {
      request: {
        query: createCommunityQuery,
        variables: { id: "CS3099", title: "CS3099", description: "Team Project" },
      },
      result: {
        errors: [new GraphQLError("Duplicate")],
      },
    },
  ];

  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateCommunityDialog />
    </MockedProvider>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByRole("button", { name: "Add Community" }));
  });

  await waitFor(() => {
    fireEvent.change(getByTestId("id"), { target: { value: "CS3099" } });
  });

  await waitFor(() => {
    fireEvent.change(getByTestId("name"), { target: { value: "CS3099" } });
  });

  await waitFor(() => {
    fireEvent.change(getByTestId("description"), { target: { value: "Team Project" } });
  });

  await waitFor(() => {
    userEvent.click(screen.getByRole("button", { name: "Create" }));
  });

  await waitFor(() => {
    getByText("There was a problem creating this community");
  });
});
