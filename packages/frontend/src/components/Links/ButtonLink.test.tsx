/*
 * CS3099 Group A3
 */

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ButtonLink } from "./ButtonLink";

test("Render", () => {
  const { getByRole } = render(
    <MemoryRouter>
      <ButtonLink to="foo" />
    </MemoryRouter>,
  );

  expect(getByRole("button").tagName).toBe("A");
});
