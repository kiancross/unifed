/*
 * CS3099 Group A3
 */

import React, { createContext, ReactElement } from "react";
import { gql, useQuery } from "@apollo/client";
import { accountsClient } from "../../helpers/accounts";

interface Context {
  details?: null | { username: string };
  refetch: () => Promise<void>;
  logout: () => Promise<void>;
}

export const getUserQuery = gql`
  query {
    getUser {
      username
    }
  }
`;

export const defaultContext: Context = {
  details: undefined,
  refetch: async () => {
    return;
  },
  logout: async () => {
    return;
  },
};

export const UserContext = createContext<Context>(defaultContext);

export const UserProvider = (props: { children: ReactElement }): ReactElement => {
  const { data, loading, error, refetch: refetchQuery } = useQuery(getUserQuery);

  const refetch = async () => {
    await refetchQuery();
  };

  const logout = async () => {
    await accountsClient.logout();
    await refetch();
  };

  const details = loading ? undefined : error ? null : data.getUser;

  return (
    <UserContext.Provider value={{ refetch, logout, details }}>
      {props.children}
    </UserContext.Provider>
  );
};
