/*
 * CS3099 Group A3
 */

import { Request } from "express";
import { DocumentType } from "@typegoose/typegoose";
import { Community, CommunityModel, Post, PostModel } from "@unifed/backend-core";
import { ResponseError } from "./response-error";

export class ParamError extends ResponseError {
  constructor(value: unknown, name: string, message?: string) {
    let error = `${name}: Invalid value '${value}'`;
    if (message) {
      error += ` (${message})`;
    }
    super(400, error);
  }
}

export const processParam = async <T>(
  params: Request["query"],
  name: string,
  processor: (value: string, name: string) => Promise<T | undefined> | T | undefined,
): Promise<T | undefined> => {
  const value = params[name];

  if (value) {
    if (typeof value === "string") {
      return await processor(value, name);
    } else {
      throw new ParamError(value, name);
    }
  } else {
    return undefined;
  }
};

export const getCommunityOrThrow = async (
  id: string,
  code: number,
): Promise<DocumentType<Community>> => {
  const community = await CommunityModel.findById(id);

  if (community === null) {
    throw new ResponseError(code, `Community not found: '${id}'`);
  }

  return community;
};

export const getPostOrThrow = async (id: string, code: number): Promise<DocumentType<Post>> => {
  const post = await PostModel.findById(id);

  if (post === null) {
    throw new ResponseError(code, `Post not found: '${id}'`);
  }

  return post;
};
