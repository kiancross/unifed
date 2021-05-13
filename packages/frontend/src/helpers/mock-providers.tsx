/*
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Kian Cross
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

import { FC } from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter, Route } from "react-router-dom";

/**
 * Properties for the [[`BrowserMockProvider`]] component.
 *
 * @internal
 */
export interface BrowserMockProviderProps {
  /**
   * The url for the provider to route to.
   *
   * This also defines the name and location of the parameters
   * e.g. `/instances/:host/communities/:community/posts` to define the location of
   * the host and communtiy params in the URL.
   */
  path?: string;

  /**
   * The existing browsing history, where the first entry is the current URL.
   */
  initialEntries?: string[];

  /**
   * Mocked versions of GraphQL calls required by the page/component test.
   */
  mocks?: MockedResponse[];
}

/**
 * A wrapper used in a number of tests.
 *
 * Outline:
 *
 *  - Provides `MockedProvider` for testing graphQL calls.
 *
 *  - Provides `MemoryRouter` and `Route` for cases where URL params are used.
 *
 * @param props
 *
 * @internal
 */
export const BrowserMockProvider: FC<BrowserMockProviderProps> = (props) => {
  return (
    <MockedProvider mocks={props.mocks} addTypename={false}>
      <MemoryRouter initialEntries={props.initialEntries}>
        <Route path={props.path}>{props.children}</Route>
      </MemoryRouter>
    </MockedProvider>
  );
};
