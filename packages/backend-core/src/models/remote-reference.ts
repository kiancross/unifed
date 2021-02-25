/*
 * CS3099 Group A3
 */

import { ObjectType } from "type-graphql";
import { JSONMap } from "../types";
import { Base } from "./base";
import { config } from "../config";

@ObjectType()
export class RemoteReference extends Base {
  toJSON(): JSONMap {
    return {
      id: this.id,
      host: this.host == config.internalReference ? config.siteHost : this.host || null,
    };
  }
}
