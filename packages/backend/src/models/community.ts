/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { User } from "./user";

@ObjectType()
export class Community {
 
  @Field()
  @Property({ required: true })
  _id!: string;
  
  @Field()
  @Property({ required: true })
  title!: string;

  @Field()
  @Property({ required: true })
  description!: string;

  @Field(() => [User])
  @Property({type: () => [User]})
  admins?: User[];
  
  public get id() {
    return this._id;
  }
  
  public set id(id: string) {
    this._id = id;
  }

  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      admins: this.admins
    };
  }
}

export const CommunityModel = getModelForClass(Community);

CommunityModel.create({_id: "work", title: "My Comm", description: "This is a description"});
