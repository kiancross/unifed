/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import {
  config,
  getIdFromRef,
  CommunityModel,
  Post,
  PostModel,
  UserModel,
  RemoteReference,
} from "@unifed/backend-core";
import { PostsFederationService, CreatePostProps } from "@unifed/backend-federation-client";
import { plainToClass } from "class-transformer";

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

  async report(id: string): Promise<boolean> {
    await PostModel.update({ _id: id }, { $set: { approved: false } });
    return true;
  }

  async approve(username: string, postId: string): Promise<boolean> {
    const post = await PostModel.findOne({ _id: postId }).exec();
    if (!this.isAdmin(username, post)) return false;
    await PostModel.update({ _id: postId }, { $set: { approved: true } });
    return true;
  }

  async adminDelete(username: string, postId: string): Promise<boolean> {
    const post = await PostModel.findOne({ _id: postId }).exec();
    if (!post || !this.isAdmin(username, post)) return false;
    const { _id: authorId, host: authorHost } = post.author;
    await PostModel.remove(post);
    if (authorHost !== config.siteHost) return true;

    const postReference: RemoteReference = new RemoteReference();
    postReference.id = postId;
    postReference.host = config.federationHost;

    await UserModel.update({ username: authorId }, { $pull: { posts: postReference } });
    return true;
  }

  async isAdmin(username: string, post: Post | null): Promise<boolean> {
    // finds the admins of the community of the post
    const communityId = getIdFromRef(post?.community);
    if (!communityId) return false;
    const admins = await CommunityModel.findOne({ _id: communityId })
      .exec()
      .then((res) => res?.admins);
    if (!admins) return false;

    // return true if username is in admins
    for (let i = 0; i < admins.length; i++) {
      if (admins[i]._id === username) {
        return true;
      }
    }
    return false;
  }

  async getUnfilteredPosts(community: string): Promise<Post[]> {
    const posts = await PostModel.find({ community: community }).lean();
    const ptcPosts = plainToClass(Post, posts).map((post) => {
      post.host = config.federationHost;
      return post;
    });
    return ptcPosts;
  }
}
