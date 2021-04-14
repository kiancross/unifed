/*
 * CS3099 Group A3
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
