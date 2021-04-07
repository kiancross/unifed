/*
 * CS3099 Group A3
 */

import { prop as Property } from "@typegoose/typegoose";
import { ObjectType } from "type-graphql";
import { JSONMap } from "../types";
import { config } from "../config";
import { Base } from "./base";

/**
 * Entity representing another entity on a
 * remote instance.
 */
@ObjectType()
export class RemoteReference extends Base {
  /**
   * The ID of the entity.
   */
  @Property({ required: true })
  _id!: string;

  /**
   * The host that the entity belongs to.
   */
  @Property({ required: true })
  host!: string;

  /**
   * Returns a JSON representation of the entity
   * in the format expected by the federation
   * protocol.
   */
  toJSON(): JSONMap {
    if (!this.host) {
      throw new Error("`host` must be set");
    }

    return {
      id: this.id,

      // Transform the host if it is referring to the local
      // instance.
      host: this.host === config.internalReference ? config.siteHost : this.host,
    };
  }
}
