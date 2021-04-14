/*
 * CS3099 Group A3
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
 * Sets an accounts client to handle logging in and out of user.
 *
 * @param client Accounts client to be set.
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
