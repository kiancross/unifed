import { render } from "@testing-library/react";

import Popup from "./Popup";

test("Popup renders", () => {
  const message = "Test Message";
  const { getByText } = render(<Popup message={message} />);

  getByText("Test Message");
});
