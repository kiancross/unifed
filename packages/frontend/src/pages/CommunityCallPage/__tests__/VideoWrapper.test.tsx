/*
 * CS3099 Group A3
 */

import { render, fireEvent } from "@testing-library/react";
import VideoWrapper from "../VideoWrapper";

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

  expect(queryByRole("button", { name: "leave" })).toBeNull();
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

  fireEvent.click(getByRole("button", { name: "leave" }));

  expect(onLeaveCall).toHaveBeenCalledTimes(1);
  expect(onLeaveCall).toHaveBeenCalledWith();
});
