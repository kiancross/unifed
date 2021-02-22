import { FC } from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter, Route } from "react-router-dom";

interface ProviderProps {
  path?: string;
  initialEntries?: string[];
  mocks?: MockedResponse[];
}

export const AllTheProviders: FC<ProviderProps> = (props) => {
  return (
    <MockedProvider mocks={props.mocks} addTypename={false}>
      <MemoryRouter initialEntries={props.initialEntries}>
        <Route path={props.path}>{props.children}</Route>
      </MemoryRouter>
    </MockedProvider>
  );
};
