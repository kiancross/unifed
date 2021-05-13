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

import { render, fireEvent } from "@testing-library/react";
import { VideoWrapper } from "../VideoWrapper";

// https://github.com/testing-library/react-testing-library/issues/470
Object.defineProperty(HTMLMediaElement.prototype, "muted", {
  set: () => null,
});

test("Username", async () => {
  const { getByText } = render(
    <VideoWrapper username="foo" muted={false} onMuteChange={jest.fn()} />,
  );

  getByText("foo");
});

test("Mute", async () => {
  const onMuteChange = jest.fn();

  const { getByRole } = render(
    <VideoWrapper username="foo" muted={false} onMuteChange={onMuteChange} />,
  );

  fireEvent.click(getByRole("button"));

  expect(onMuteChange).toHaveBeenCalledTimes(1);
  expect(onMuteChange).toHaveBeenCalledWith();
});

test("Leave call hidden", async () => {
  const { queryByRole } = render(
    <VideoWrapper username="foo" muted={false} onMuteChange={jest.fn()} />,
  );

  expect(queryByRole("button", { name: "leave call" })).toBeNull();
});

test("Leave call click", async () => {
  const onLeaveCall = jest.fn();

  const { getByRole } = render(
    <VideoWrapper
      username="foo"
      self={true}
      muted={false}
      onMuteChange={jest.fn()}
      onLeaveCall={onLeaveCall}
    />,
  );

  fireEvent.click(getByRole("button", { name: "leave call" }));

  expect(onLeaveCall).toHaveBeenCalledTimes(1);
  expect(onLeaveCall).toHaveBeenCalledWith();
});
