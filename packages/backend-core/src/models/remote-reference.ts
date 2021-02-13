/*
 * CS3099 Group A3
 */

import { IsString, IsNotEmpty } from "class-validator";
import { ObjectType, Field } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { JSONMap } from "../types";
import { config } from "../config";

@ObjectType()
export class RemoteReference {
  constructor(id: string, host: string) {
    this.id = id;
    this.host = host;
  }

  @IsNotEmpty()
  @IsString()
  @Field()
  @Property({ required: true })
  id!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  @Property({ required: true })
  host!: string;

  toJSON(): JSONMap {
    return {
      id: this.id,
      host: this.host == config.internalReference ? config.siteHost : this.host,
    };
  }
}
