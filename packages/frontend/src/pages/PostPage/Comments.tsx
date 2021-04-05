/*
 * CS3099 Group A3
 */

import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid, GridSize } from "@material-ui/core";

import { CenteredLoader } from "../../components";
import { Comment } from "./Comment";

interface CommentParams {
  server: string;
  parentId: string;
  grids: GridSize;
  community: string;
}

interface PostParams {
  id: string;
  body: string;
  author: {
    id: string;
  };
}

export const getCommentsQuery = gql`
  query GET_COMMENTS($id: String!, $server: String!) {
    getPost(post: { id: $id, host: $server }) {
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

export function Comments(props: CommentParams) {
  const parentId = props.parentId;
  const server = props.server;

  const decrement = (grids: number): GridSize => {
    if (grids >= 9) {
      return (grids - 1) as GridSize;
    } else {
      return grids as GridSize;
    }
  };

  const { loading, error, data } = useQuery(getCommentsQuery, {
    variables: { id: parentId, server },
  });

  if (error) return <h1>Error! ${error.message} </h1>;
  if (loading) return <CenteredLoader />;

  const commentPosts = data.getPost.children;

  if (commentPosts.length === 0) return <div />;

  return (
    <Grid item container xs={12} direction="column">
      {commentPosts.map((post: PostParams) => {
        const username = post.author.id;
        const text = post.body;
        return (
          <React.Fragment key={post.id}>
            <Comment
              host={server}
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
              server={props.server}
              grids={decrement(props.grids as number)}
            />
          </React.Fragment>
        );
      })}
    </Grid>
  );
}
