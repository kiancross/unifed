/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { Post, PostModel, UserModel, RemoteReference } from "@unifed/backend-core";
import { PostsFederationService, CreatePostProps } from "@unifed/backend-federation-client";

@Service()
export class PostsService extends PostsFederationService {
  async create(username: string, host: string, post: CreatePostProps): Promise<Post> {
    const result = await super.create(username, host, post);

    const postReference: RemoteReference = new RemoteReference();
    postReference.id = result.id;
    postReference.host = host;

    await UserModel.update({ username: username }, { $push: { posts: postReference } });

    return result;
  }

  async delete(username: string, host: string, id: string): Promise<void> {
    await super.delete(username, host, id);

    const postReference: RemoteReference = new RemoteReference();
    postReference.id = id;
    postReference.host = host;

    await UserModel.update({ username: username }, { $pull: { posts: postReference } });
  }

  async approve(id: string): Promise<boolean> {
    await PostModel.update({ _id: id }, { $set: {approved: true} });
    return true;
  }
}
