/*
 * CS3009 Group A3
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
export const accountsContext = graphModule.context;
