/*
 * CS3099 Group A3
 */

import { render } from "@testing-library/react";
import { UserIcon } from "./UserIcon";

const username = "testuser";
const firstLetter = "T";
test("normal size renders", () => {
  const { getByText } = render(<UserIcon username={username} />);

  getByText(firstLetter);
});

test("small size renders", () => {
  const { getByText } = render(<UserIcon username={username} small />);

  getByText(firstLetter);
});
