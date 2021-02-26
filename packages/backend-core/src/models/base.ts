/*
 * CS3099 Group A3
 */

import { IsString, IsNotEmpty } from "class-validator";
import { prop as Property, defaultClasses } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { dateToUnixTimestamp } from "./helpers";
import { JSONMap } from "../types";

export type EntityID = string;

@ObjectType()
export abstract class Base extends defaultClasses.TimeStamps {
  @IsNotEmpty()
  @IsString()
  @Property({ default: uuidv4, required: true })
  _id!: EntityID;

  @Field()
  host?: string;

  @Field(() => ID)
  get id(): EntityID {
    return this._id;
  }

  set id(id: EntityID) {
    this._id = id;
  }

  get created(): number {
    return dateToUnixTimestamp(this.createdAt);
  }

  set created(created: number) {
    this.createdAt = new Date(created * 1000);
  }

  get modified(): number {
    return dateToUnixTimestamp(this.updatedAt);
  }

  set modified(modified: number) {
    this.updatedAt = new Date(modified * 1000);
  }

  toJSON(): JSONMap {
    return {
      id: this.id,
    };
  }
}
