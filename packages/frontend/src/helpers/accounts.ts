/*
 * CS3099 Group A3
 */

import { AccountsGraphQLClient } from "@accounts/graphql-client";
import { AccountsClient } from "@accounts/client";
import { AccountsClientPassword } from "@accounts/client-password";
import { apolloClient, setAccountsClient } from "./apollo-client";

const accountsGraphQL = new AccountsGraphQLClient({
  graphQLClient: apolloClient,
});

/**
 * Base authentication client.
 *
 * @internal
 */
export const accountsClient = new AccountsClient({}, accountsGraphQL);

/**
 * Authentication client for the password strategy.
 *
 * @internal
 */
export const passwordClient = new AccountsClientPassword(accountsClient);

setAccountsClient(accountsClient);
