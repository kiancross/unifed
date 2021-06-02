/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

const TriggerError = (props: { error: boolean }): ReactElement => {
  if (props.error) {
    throw new Error("Test Error");
  } else {
    return <div />;
  }
};

test("Error boundary", () => {
  const { queryByText, getByText, rerender } = render(
    <BrowserRouter>
      <ErrorBoundary>
        <TriggerError error={false} />
      </ErrorBoundary>
    </BrowserRouter>,
  );

  expect(queryByText(/Something went wrong/)).toBeNull();

  const consoleLog = console.log;
  const consoleError = console.error;
  console.log = jest.fn();
  console.error = jest.fn();

  rerender(
    <BrowserRouter>
      <ErrorBoundary>
        <TriggerError error={true} />
      </ErrorBoundary>
    </BrowserRouter>,
  );

  getByText(/Something went wrong/);

  console.log = consoleLog;
  console.error = consoleError;
});
