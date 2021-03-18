import UserIcon from "./UserIcon";
import { render } from "@testing-library/react";

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
