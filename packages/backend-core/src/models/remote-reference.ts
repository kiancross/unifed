/*
 * CS3099 Group A3
 */

import { ObjectType } from "type-graphql";
import { JSONMap } from "../types";
import { config } from "../config";
import { Base } from "./base";

@ObjectType()
export class RemoteReference extends Base {
  host!: string;

  toJSON(): JSONMap {
    return {
      ...super.toJSON(),
      host: this.host === config.internalReference ? config.siteHost : this.host || null,
    };
  }
}
