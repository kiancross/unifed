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
