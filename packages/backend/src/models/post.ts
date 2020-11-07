/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass, defaultClasses } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

export interface Post extends defaultClasses.Base {};

@ObjectType()
export class Post extends defaultClasses.TimeStamps {

  @Field()
  @Property({ required: true })
  parent?: string;

  @Field()
  @Property({ required: true })
  children!: string;

  @Field()
  @Property({ required: true })
  contentType!: string;
  
  @Field()
  @Property({ required: true })
  body!: string;
  
  @Field()
  @Property({ required: true })
  author!: string;
  
  public get id() {
    return this._id;
  }
  
  public get created() {
    return this.createdAt;
  }
  
  public get modified() {
    return this.updatedAt;
  }
  
  public toJSON() {
    return {
      id: this.id
    };
  }
}

export const PostModel = getModelForClass(Post);

PostModel.create({parent: "lol", children: "ok", body: "sd", author: "sd", contentType: "text"});
