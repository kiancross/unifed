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

import React, { ReactElement } from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid, GridSize } from "@material-ui/core";

import { CenteredLoader, Comment, ErrorMessage } from "../../components";

/**
 * Properties for the [[`Comments`]] component.
 *
 * @internal
 */
export interface CommentsProps {
  /**
   * Host the comments are located on.
   */
  host: string;

  /**
   * The ID of the post or comment one level up from the current comment.
   */
  parentId: string;

  /**
   * How wide the comment should be. This is based on how nested it is.
   */
  grids: GridSize;

  /**
   * The community the comments are located on.
   */
  community: string;
}

interface Post {
  id: string;
  body: string;
  author: {
    id: string;
  };
}

/**
 * GraphQL query to get the comments on a post.
 *
 * @internal
 */
export const getCommentsQuery = gql`
  query GET_COMMENTS($id: String!, $host: String!) {
    getPost(post: { id: $id, host: $host }) {
      id
      children {
        id
        body
        author {
          id
        }
      }
    }
  }
`;

/**
 * Displays all the comments of a post, including any nested one.
 *
 * @param props Properties passed to the component. See [[`CommentsProps`]].
 *
 * @internal
 */
export function Comments(props: CommentsProps): ReactElement {
  const parentId = props.parentId;
  const host = props.host;

  const decrement = (grids: number): GridSize => {
    if (grids >= 9) {
      return (grids - 1) as GridSize;
    } else {
      return grids as GridSize;
    }
  };

  const { loading, error, data } = useQuery(getCommentsQuery, {
    variables: { id: parentId, host },
  });

  if (error)
    return (
      <ErrorMessage message="The comments for could not be retrived. Please try again later." />
    );
  if (loading) return <CenteredLoader />;

  const commentPosts = data.getPost.children;

  if (commentPosts.length === 0) return <div />;

  return (
    <Grid item container xs={12} direction="column">
      {commentPosts.map((post: Post) => {
        const username = post.author.id;
        const text = post.body;
        return (
          <React.Fragment key={post.id}>
            <Comment
              host={host}
              username={username}
              body={text}
              id={post.id}
              parent={parentId}
              community={props.community}
              grids={props.grids}
            />
            <Comments
              community={props.community}
              parentId={post.id}
              host={props.host}
              grids={decrement(props.grids as number)}
            />
          </React.Fragment>
        );
      })}
    </Grid>
  );
}
