/*
 * Copyright (C) 2021 Kian Cross
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

import { render, fireEvent } from "@testing-library/react";
import { VideoGrid } from "../VideoGrid";

test("Usernames", async () => {
  const users = [
    {
      username: "foo",
      muted: false,
      onMuteChange: jest.fn(),
    },
    {
      username: "bar",
      muted: false,
      onMuteChange: jest.fn(),
    },
  ];

  const { getByText } = render(<VideoGrid users={users} />);

  getByText("foo");
  getByText("bar");
});

test("Mute", async () => {
  const onMuteChange = jest.fn();

  const users = [
    {
      username: "foo",
      muted: false,
      onMuteChange,
    },
  ];

  const { getByRole } = render(<VideoGrid users={users} />);

  fireEvent.click(getByRole("button"));

  expect(onMuteChange).toHaveBeenCalledTimes(1);
  expect(onMuteChange).toHaveBeenCalledWith();
});
