/*
 * CS3099 Group A3
 */

import React, { createContext, ReactElement } from "react";
import { gql, useQuery } from "@apollo/client";
import { accountsClient } from "../../helpers/accounts";

interface Context {
  details?: null | { username: string };
  refetch: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
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
  login: async () => {
    return false;
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

  const login = async (email: string, password: string) => {
    try {
      if (
        await accountsClient.loginWithService("password", {
          user: { email },
          password,
        })
      ) {
        await refetch();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error.message === "User not found") {
        return false;
      } else {
        throw error;
      }
    }
  };

  const logout = async () => {
    await accountsClient.logout();
    await refetch();
  };

  const details = loading ? undefined : error ? null : data.getUser;

  return (
    <UserContext.Provider value={{ refetch, login, logout, details }}>
      {props.children}
    </UserContext.Provider>
  );
};
