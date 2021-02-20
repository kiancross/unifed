/*
 * CS3099 Group A3
 */

import { render, fireEvent } from "@testing-library/react";
import VideoGrid from "../VideoGrid";

test("Usernames", async () => {
  const users = [
    {
      username: "foo",
      muted: false,
    },
    {
      username: "bar",
      muted: false,
    },
  ];

  const { getByText } = render(<VideoGrid users={users} onMuteChange={() => jest.fn()} />);

  getByText("foo");
  getByText("bar");
});

test("Mute", async () => {
  const users = [
    {
      username: "foo",
      muted: false,
    },
  ];

  const onMuteChange = jest.fn();

  const { getByRole } = render(<VideoGrid users={users} onMuteChange={onMuteChange} />);

  fireEvent.click(getByRole("button"));

  expect(onMuteChange).toHaveBeenCalledTimes(1);
  expect(onMuteChange).toHaveBeenCalledWith(false, "foo");
});
