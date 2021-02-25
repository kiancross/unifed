/*
 * CS3099 Group A3
 */

import { IsString, IsNotEmpty } from "class-validator";
import { prop as Property, defaultClasses } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { JSONMap } from "../types";

export type EntityID = string;

@ObjectType()
export abstract class Base extends defaultClasses.TimeStamps {
  @IsNotEmpty()
  @IsString()
  @Property({ default: uuidv4, required: true })
  _id!: EntityID;

  protected _host?: string;

  @Field(() => ID)
  get id(): EntityID {
    return this._id;
  }

  set id(id: EntityID) {
    this._id = id;
  }

  @Field()
  get host(): string {
    return this._host || "this";
  }

  set host(host: string) {
    this._host = host;
  }

  toJSON(): JSONMap {
    return {
      id: this.id,
    };
  }
}
