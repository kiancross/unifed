/*
 * CS3099 Group A3
 */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import IconButtonLink from "./IconButtonLink";

test("Render", () => {
  const { getByRole } = render(
    <MemoryRouter>
      <IconButtonLink to="foo" />
    </MemoryRouter>,
  );

  expect(getByRole("button").tagName).toBe("A");
});
