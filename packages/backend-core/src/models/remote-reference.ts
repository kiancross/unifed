/*
 * CS3099 Group A3
 */

import { ObjectType, Field } from "type-graphql";
import { JSONMap } from "../types";
import { config } from "../config";
import { Base } from "./base";

@ObjectType()
export class RemoteReference extends Base {
  @Field()
  get host(): string {
    return super.host === config.internalReference ? config.siteHost : super.host;
  }

  set host(host: string) {
    this._host = host;
  }

  toJSON(): JSONMap {
    return {
      id: this.id,
      host: this.host,
    };
  }
}
