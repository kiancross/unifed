/*
 * CS3099 Group A3
 */

import { IsString, IsNotEmpty } from "class-validator";
import { ObjectType, Field } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class RemoteReference {
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

  toJSON(): { [key: string]: any } {
    return {
      id: this.id,
      host: this.host,
    };
  }
}
