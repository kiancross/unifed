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
