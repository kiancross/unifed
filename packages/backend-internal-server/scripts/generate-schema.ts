/*
 * CS3009 Group A3
 */

process.env.UNIFED_LOGGING_LEVEL = "info";
process.env.UNIFED_APPLICATION_NAME = "info";
process.env.UNIFED_JWT_SECRET = "info";
process.env.UNIFED_SITE_PROTOCOL = "info";
process.env.UNIFED_SITE_HOST = "info";

import "reflect-metadata";
import { AccountsModule } from "@accounts/graphql-api";
import { AccountsPassword } from "@accounts/password";
import { AccountsServer } from "@accounts/server";
import { DatabaseInterface, Session, User } from "@accounts/types";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as path from "path";
import { emitSchemaDefinitionFile } from "type-graphql";
import { Container } from "typedi";
import { getInternalSchema } from "../src/schema";

class DatabaseStub implements DatabaseInterface {
  public async setupIndexes(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async findUserById(): Promise<User | null> {
    return new Promise((resolve) => resolve(null));
  }

  public async createUser(): Promise<string> {
    return new Promise((resolve) => resolve("foo"));
  }

  public async findUserByEmail(): Promise<User | null> {
    return new Promise((resolve) => resolve(null));
  }
  public async findUserByUsername(): Promise<User | null> {
    return new Promise((resolve) => resolve(null));
  }

  public async findPasswordHash(): Promise<string | null> {
    return new Promise((resolve) => resolve(null));
  }

  public async findUserByEmailVerificationToken(): Promise<User | null> {
    return new Promise((resolve) => resolve(null));
  }

  public async findUserByResetPasswordToken(): Promise<User | null> {
    return new Promise((resolve) => resolve(null));
  }

  public async addEmail(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async removeEmail(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async verifyEmail(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async setUsername(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async setPassword(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public get setResetPassword(): DatabaseInterface["setResetPassword"] {
    return () => new Promise((resolve) => resolve());
  }

  public async removeAllResetPasswordTokens(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async addEmailVerificationToken(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async addResetPasswordToken(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async createSession(): Promise<string> {
    return new Promise((resolve) => resolve("foo"));
  }

  public async findSessionById(): Promise<Session | null> {
    return new Promise((resolve) => resolve(null));
  }

  public async findSessionByToken(): Promise<Session | null> {
    return new Promise((resolve) => resolve(null));
  }

  public async updateSession(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async invalidateSession(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async invalidateAllSessions(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async findUserByServiceId(): Promise<User | null> {
    return new Promise((resolve) => resolve(null));
  }

  public async setService(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async unsetService(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async setUserDeactivated(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}

(async () => {
  const passwordStrategy = new AccountsPassword();

  const server = new AccountsServer(
    {
      db: new DatabaseStub(),
      tokenSecret: "foo",
    },
    { password: passwordStrategy },
  );

  const graphModule = AccountsModule.forRoot({ accountsServer: server });

  const accountsTypeDefs = mergeTypeDefs([graphModule.typeDefs]);
  const accountsResolvers = mergeResolvers([graphModule.resolvers]);
  const accountsSchemaDirectives = graphModule.schemaDirectives;

  const { typeDefs, resolvers } = await getInternalSchema(Container.of());

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([accountsTypeDefs, typeDefs]),
    resolvers: mergeResolvers([accountsResolvers, resolvers]),
    schemaDirectives: {
      ...accountsSchemaDirectives,
    },
  });

  const schemaOutputPath = path.resolve(__dirname, "../.schema.graphql");
  await emitSchemaDefinitionFile(schemaOutputPath, schema);
})();
