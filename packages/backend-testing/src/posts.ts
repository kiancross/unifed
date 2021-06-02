/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { lorem } from "faker";
import { v4 as uuid } from "uuid";
import { Post, RemoteReference } from "@unifed/backend-core";

/**
 * Generates a test post with random attributes for all fields.
 *
 * @param community the community the created post is part of.
 */
export const generatePost = (community: string): Post => {
  const post = new Post();
  post.community = community;
  post.id = uuid();
  post.title = lorem.words();
  post.body = lorem.paragraph();
  post.contentType = "markdown";
  post.updatedAt = new Date();
  post.createdAt = new Date();
  post.approved = true;
  post.children = [];
  post.parentPost = null;

  post.author = new RemoteReference();
  post.author.id = lorem.word();
  post.author.host = lorem.word();

  return post;
};
