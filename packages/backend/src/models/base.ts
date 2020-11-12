/*
 * CS3099 Group A3
 */

import { prop as Property, defaultClasses, Ref, isRefType, isDocument } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { v4 as uuidv4 } from "uuid";

class UnrecognisedPropertyError<T> extends Error {
  constructor(item: T) {
    super(`Property if of unrecognised type: ${typeof item}`);
  }
}

export function getIdFromRef<T>(item: Ref<T>) {
  if (isDocument(item)) {
    return item.id;
  } else if (isRefType(item)) {
    return item;
  } else {
    throw new UnrecognisedPropertyError(item);
  }
}

@ObjectType()
export abstract class Base extends defaultClasses.TimeStamps {
  @Property({ default: uuidv4 })
  _id!: string;

  @Field()
  host?: string;

  @Field(() => ID)
  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  toJSON(): { [key: string]: any } {
    return {
      id: this.id,
    };
  }
}
