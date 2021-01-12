/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { Post, User } from "@unifed/backend-core";
import { postsClient } from "@unifed/backend-federation-client";

@Service()
export class PostsService {
  async getByCommunity(host: string, id: string): Promise<Post[]> {
    return await postsClient.getPosts(host, id);
  }

  async getById(host: string, id: string): Promise<Post> {
    return await postsClient.getPost(host, id);
  }

  async create(
    host: string,
    user: User,
    id: string,
    title: string,
    body: string,
  ): Promise<Post | null> {
    return await postsClient.createPost(host, user, id, title, body);
  }
}
