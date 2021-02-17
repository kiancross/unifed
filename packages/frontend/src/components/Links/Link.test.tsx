/*
 * CS3099 Group A3
 */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Link from "./Link";

test("Render", () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Link to="foo">bar</Link>
    </MemoryRouter>,
  );

  expect(getByRole("link").tagName).toBe("A");
});
