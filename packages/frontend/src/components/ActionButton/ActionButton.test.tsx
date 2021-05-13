/*
 * Copyright (C) 2021 Allan Mathew Chacko
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

import { ApolloError } from "@apollo/client";
import { act, fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";
import { ActionButton } from "./ActionButton";

test("Render ActionButton", async () => {
  render(
    <ActionButton loading={false} error={undefined}>
      {"Click me"}
    </ActionButton>,
  );
  screen.getByRole("button", { name: "Click me" });
});

test("Render ActionButton on loading", async () => {
  const { queryByText } = render(
    <ActionButton loading={true} error={undefined}>
      {"Click me"}
    </ActionButton>,
  );
  await waitFor(() => {
    screen.getByRole("button");
    screen.getByRole("progressbar");
  });
  expect(queryByText("Click me")).toBeNull();
});

test("Show alert on error", async () => {
  const error = new ApolloError({});
  const onClick = jest.fn();
  const { getByText, queryByText } = render(
    <ActionButton
      loading={false}
      error={error}
      onClick={onClick}
      errorMessage="There was a problem"
    >
      {"Click me"}
    </ActionButton>,
  );

  getByText("There was a problem");
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
  });
  expect(onClick).toHaveBeenCalledTimes(1);
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
  });
  await waitFor(() => {
    expect(queryByText("There was a problem")).toBeNull();
  });
});
