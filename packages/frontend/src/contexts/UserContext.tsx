/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Allan Mathew Chacko
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

import { createContext, ReactElement } from "react";
import { gql, useQuery } from "@apollo/client";
import { accountsClient } from "../helpers";

interface Context {
  details?: null | { username: string; profile: { name: string }; emails: { address: string }[] };
  refetch: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

/**
 * GraphQL query to get the logged in user's information.
 *
 * @internal
 */
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

/**
 * Sets fields and initial values for the [[`UserContext`]].
 *
 * @internal
 */
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

/**
 * Imported by components and pages to access the current state of the user,
 * such as their login status and name.
 *
 * @internal
 */
export const UserContext = createContext<Context>(defaultUserContext);

/**
 * Wrapper for the application so that all components and pages can access the user information at any point.
 *
 * This helps to prevent prop drilling.
 *
 * @internal
 */
export function UserProvider(props: { children: ReactElement }): ReactElement {
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
}
