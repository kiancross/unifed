/*
 * CS3099 Group A3
 */

import { render, fireEvent } from "@testing-library/react";
import VideoWrapper from "../VideoWrapper";

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
