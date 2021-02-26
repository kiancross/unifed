/*
 * CS3099 Group A3
 */

import { prop as Property } from "@typegoose/typegoose";
import { ObjectType } from "type-graphql";
import { JSONMap } from "../types";
import { config } from "../config";
import { Base } from "./base";

@ObjectType()
export class RemoteReference extends Base {
  @Property({ required: true })
  _id!: string;

  @Property({ required: true })
  host!: string;

  toJSON(): JSONMap {
    if (!this.host) {
      throw new Error("`host` must be set");
    }

    return {
      ...super.toJSON(),
      host: this.host === config.internalReference ? config.siteHost : this.host,
    };
  }
}
