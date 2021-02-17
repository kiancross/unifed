/*
 * CS3099 Group A3
 */

import { DocumentType } from "@typegoose/typegoose";
import { Community, CommunityModel, Post, PostModel } from "@unifed/backend-core";
import { ResponseError } from "./response-error";

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
