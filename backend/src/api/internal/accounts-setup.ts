/*
 * CS3009 Group A3
 */

import mongoose from "mongoose";
import MongoDBInterface from "@accounts/mongo";
import { AccountsServer, ServerHooks } from "@accounts/server";
import { AccountsPassword } from "@accounts/password";
import { AccountsModule } from "@accounts/graphql-api";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { emailTransporter } from "../../utils/email";
import { validateUsername, validateName, validatePassword } from "../../utils/validators";
import * as config from "../../utils/config";

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

export const accountsDatabase = new MongoDBInterface(mongoose.connection);

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
    createJwtPayload: async (data, user) => {
      console.log(data, user);
      return {};
    },
    sendMail: (params) => {
      return emailTransporter.sendMail(params);
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
export const accountsContext = graphModule.context;
