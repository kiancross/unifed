/*
 * CS3099 Group A3
 */

import { FC } from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter, Route } from "react-router-dom";

export interface BrowserMockProviderProps {
  path?: string;
  initialEntries?: string[];
  mocks?: MockedResponse[];
}

export const BrowserMockProvider: FC<BrowserMockProviderProps> = (props) => {
  return (
    <MockedProvider mocks={props.mocks} addTypename={false}>
      <MemoryRouter initialEntries={props.initialEntries}>
        <Route path={props.path}>{props.children}</Route>
      </MemoryRouter>
    </MockedProvider>
  );
};
