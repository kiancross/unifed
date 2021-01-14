/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { Post, User } from "@unifed/backend-core";
import { postsClient } from "@unifed/backend-federation-client";
import { translateHost } from "./helpers";

@Service()
export class PostsService {
  async getByCommunity(host: string, id: string): Promise<Post[]> {
    return await postsClient.getPosts(await translateHost(host), id);
  }

  async getById(host: string, id: string): Promise<Post> {
    return await postsClient.getPost(await translateHost(host), id);
  }

  async create(
    host: string,
    user: User,
    id: string,
    title: string,
    body: string,
  ): Promise<Post | null> {
    return await postsClient.createPost(await translateHost(host), user, id, title, body);
  }
}
