/*
 * CS3099 Group A3
 */

import { render, fireEvent } from "@testing-library/react";
import JoinCallMessage from "../JoinCallMessage";

test("Button", async () => {
  const onJoinClick = jest.fn();

  const { getByRole } = render(<JoinCallMessage onJoinClick={onJoinClick} />);

  fireEvent.click(getByRole("button"));

  expect(onJoinClick).toHaveBeenCalledTimes(1);
});
