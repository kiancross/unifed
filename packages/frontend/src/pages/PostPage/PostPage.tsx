/*
 * Copyright (C) 2020 Robert Mardall
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
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

import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Container, Grid, useMediaQuery } from "@material-ui/core";

import { PostCreator, UserInfoCard, CenteredLoader, ErrorMessage } from "../../components";
import { Post } from "./Post";
import { Comments } from "./Comments";
import { ReactElement } from "react";

/**
 * Params taken by the [[`PostPage`]] component.
 *
 * @internal
 */
export interface PostPageParams {
  /**
   * The host that the post of the post page is on.
   */
  host: string;

  /**
   * The community that the post of the post page is part of.
   */
  community: string;

  /**
   * The ID of the post.
   */
  post: string;
}

/**
 * GraphQL query to get a post with a given ID on a given host.
 *
 * @internal
 */
export const getPostQuery = gql`
  query GET_POST($id: String!, $host: String!) {
    getPost(post: { id: $id, host: $host }) {
      id
      title
      body
      author {
        id
      }
    }
  }
`;

/**
 * Displays a post, along with its author's information, and the comments on it.
 *
 * Outline:
 *
 *  - The [[`Post`]] component shows the post itself.
 *
 *  - The [[`Comments`]] component shows the comments on the post, including nested ones.
 *
 *  - The [[`UserInfoCard`]] component shows the author's information
 *    (username, name and [[`UserIcon`]]).
 *
 * @internal
 */
export function PostPage(): ReactElement {
  const { post, host, community } = useParams<PostPageParams>();
  const { loading, error, data } = useQuery(getPostQuery, {
    variables: { id: post, host: host },
  });
  const isMobile = useMediaQuery("(max-width: 960px)");
  const direction = isMobile ? "column-reverse" : "row";

  if (error)
    return <ErrorMessage message="The post could not be retrieved. Please try again later." />;
  if (loading) return <CenteredLoader />;

  const postData = data.getPost;
  const username = postData.author.id;
  const body = postData.body;
  const title = postData.title;

  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <Grid alignContent="center" container direction={direction} spacing={3}>
        <Grid item container xs={12} md={8} direction="column" spacing={2}>
          <Post
            community={community}
            id={post}
            host={host}
            username={username}
            body={body}
            title={title}
          />
          <PostCreator
            isComment
            parentId={post}
            host={host}
            community={community}
            submitButtonText="Add Comment"
            onSuccess={() => null}
          />
          <Comments community={community} parentId={post} host={host} grids={12} />
        </Grid>

        <Grid item container xs={12} md={4} direction="column" spacing={2}>
          <UserInfoCard username={username} name={username} />
        </Grid>
      </Grid>
    </Container>
  );
}
