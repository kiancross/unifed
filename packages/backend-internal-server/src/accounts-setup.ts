/*
 * Copyright (C) 2020 Kian Cross
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

import mongoose from "mongoose";
import MongoDBInterface from "@accounts/mongo";
import { v4 as uuidv4 } from "uuid";
import { AccountsServer, ServerHooks } from "@accounts/server";
import { AccountsPassword } from "@accounts/password";
import { AccountsModule } from "@accounts/graphql-api";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { validateUsername, validateName, validatePassword } from "@unifed/shared";
import { config } from "@unifed/backend-core";
import { getEmailTransporter } from "./email";

class EmailNotVerifiedError extends Error {
  constructor() {
    super("No verified email addresses");
  }
}

class MissingFieldError extends Error {
  constructor(field: string) {
    super(`Missing field: '${field}'`);
  }
}

class InvalidFieldError extends Error {
  constructor(field: string) {
    super(`Invalid field: '${field}'`);
  }
}

export const accountsDatabase = new MongoDBInterface(mongoose.connection, {
  idProvider: uuidv4,
  convertUserIdToMongoObjectId: false,
  convertSessionIdToMongoObjectId: false,
});

const passwordStrategy = new AccountsPassword({
  validateUsername: (username) => {
    if (!username) {
      throw new MissingFieldError("username");
    }

    if (!validateUsername(username)) {
      throw new InvalidFieldError("username");
    }

    return true;
  },
  validatePassword: (password) => {
    if (!password) {
      throw new MissingFieldError("password");
    }

    if (!validatePassword(password).valid) {
      throw new InvalidFieldError("password");
    }

    return true;
  },
  validateNewUser: (user) => {
    if (!user.username) throw new MissingFieldError("username");
    if (!user.email) throw new MissingFieldError("email");
    if (!user.password) throw new MissingFieldError("password");
    if (!user.profile.name) throw new MissingFieldError("profile.name");

    if (!validateName(user.profile.name)) throw new InvalidFieldError("profile.name");

    return user;
  },
  twoFactor: {
    appName: config.applicationName,
  },
});

const server = new AccountsServer(
  {
    db: accountsDatabase,
    tokenSecret: config.jwtSecret,
    siteUrl: config.siteUrl,
    ambiguousErrorMessages: false,
    /*
    createJwtPayload: async (data, user) => {
      console.log(data, user);
      return {};
    },
   */
    sendMail: (params) => {
      return getEmailTransporter().sendMail(params);
    },
  },
  { password: passwordStrategy },
);

server.on(ServerHooks.ValidateLogin, ({ user }) => {
  for (const email of user.emails) {
    if (email.verified) {
      return true;
    }
  }

  throw new EmailNotVerifiedError();
});

const graphModule = AccountsModule.forRoot({ accountsServer: server });

export const accountsTypeDefs = mergeTypeDefs([graphModule.typeDefs]);
export const accountsResolvers = mergeResolvers([graphModule.resolvers]);
export const accountsSchemaDirectives = graphModule.schemaDirectives;

// Fix from here: https://github.com/accounts-js/accounts/issues/843
// Nasty hack
export const accountsContext = async (session: any) => { // eslint-disable-line
  if (!session.req) {
    const pseudoContext: any = {}; // eslint-disable-line
    pseudoContext.headers = session.connection.context;
    pseudoContext.req = {
      headers: session.connection.context,
    };
    return graphModule.context(pseudoContext);
  }

  return graphModule.context(session);
};
