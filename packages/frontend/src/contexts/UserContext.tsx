/*
 * CS3099 Group A3
 */

import { createContext, ReactElement } from "react";
import { gql, useQuery } from "@apollo/client";
import { accountsClient } from "../helpers";

interface Context {
  details?: null | { username: string; profile: { name: string }; emails: { address: string }[] };
  refetch: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const getUserQuery = gql`
  query {
    getUser {
      username
      profile {
        name
      }
      emails {
        address
      }
    }
  }
`;

export const defaultUserContext: Context = {
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

export const UserContext = createContext<Context>(defaultUserContext);

export const UserProvider = (props: { children: ReactElement }): ReactElement => {
  const { data, loading, error, refetch: refetchQuery } = useQuery(getUserQuery);

  const refetch = async () => {
    await refetchQuery();
  };

  const login = async (email: string, password: string) => {
    try {
      await accountsClient.loginWithService("password", {
        user: { email },
        password,
      });

      await refetch();

      return true;
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
