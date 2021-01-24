import { render } from "@testing-library/react";
import React from "react";

import Popup from "./Popup";

test("Popup renders", () => {
  const message = "Test Message";
  const { getByText } = render(<Popup message={message} open={true} />);

  getByText("Test Message");
});
