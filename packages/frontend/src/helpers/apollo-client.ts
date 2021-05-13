/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Lewis Mazzei
 * Copyright (C) 2020 Robert Mardall
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

import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { AccountsClient } from "@accounts/client";
import { RetryLink } from "@apollo/client/link/retry";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { WebSocketLink } from "@apollo/client/link/ws";
import { accountsLink } from "@accounts/apollo-link";

let graphqlApiEndpoint = process.env.REACT_APP_INTERNAL_GRAPHQL_ENDPOINT;

if (graphqlApiEndpoint === undefined) {
  graphqlApiEndpoint = "http://localhost:8080/internal";
}

let accountsClientResolver: (client: AccountsClient) => void;
let accountsClient: AccountsClient;

const accountsClientPromise: Promise<AccountsClient> = new Promise((resolve) => {
  accountsClientResolver = resolve;
});

/**
 * AccountsJS has some poorly designed configuration steps, which led
 * to circular dependencies.
 *
 * This function is used to lazily set the `accountsClient`, reference,
 * which is needed to add authentication tokens to each request.
 *
 * @param client Accounts client to be set.
 *
 * @internal
 */
export function setAccountsClient(client: AccountsClient): void {
  accountsClientResolver(client);
  accountsClient = client;
}

const retryLink = new RetryLink();
const authLink = accountsLink(() => accountsClient);
const httpLink = new BatchHttpLink({ uri: graphqlApiEndpoint });

const wsLink = new WebSocketLink({
  uri: graphqlApiEndpoint.replace(/^http/, "ws"),
  options: {
    reconnect: true,
    connectionParams: async () => {
      const accountsClient = await accountsClientPromise;
      const token = (await accountsClient.getTokens())?.accessToken;

      return { authorization: `Bearer ${token}` };
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink,
);

/**
 * Client to deal with apollo queries.
 *
 * @internal
 */
export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([retryLink, authLink, splitLink]),
  cache: new InMemoryCache(),
});
