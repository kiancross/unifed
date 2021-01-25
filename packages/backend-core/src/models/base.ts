/*
 * CS3099 Group A3
 */

import { IsString, IsNotEmpty } from "class-validator";
import { prop as Property, defaultClasses } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { v4 as uuidv4 } from "uuid";

export type EntityID = string;

@ObjectType()
export abstract class Base extends defaultClasses.TimeStamps {
  @IsNotEmpty()
  @IsString()
  @Property({ default: uuidv4 })
  _id!: EntityID;

  @IsNotEmpty()
  @IsString()
  @Field()
  host?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  get id(): EntityID {
    return this._id;
  }

  set id(id: EntityID) {
    this._id = id;
  }

  toJSON(): { [key: string]: any } {
    return {
      id: this.id,
    };
  }
}
