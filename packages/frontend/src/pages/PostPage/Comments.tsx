/*
 * CS3099 Group A3
 */

import React from "react";
import { gql, useQuery } from "@apollo/client";
import Comment from "./Comment";
import { Grid, GridSize } from "@material-ui/core";
import CenteredLoader from "../../components/CenteredLoader";

interface CommentParams {
  server: string;
  parentId: string;
  grids: GridSize;
}

interface PostParams {
  id: string;
  body: string;
  author: {
    id: string;
  };
}

export const GET_COMMENTS = gql`
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

const Comments = (props: CommentParams) => {
  const parentId = props.parentId;
  const server = props.server;

  const decrement = (grids: number): GridSize => {
    if (grids >= 9) {
      return (grids - 1) as GridSize;
    } else {
      return grids as GridSize;
    }
  };

  const { loading, error, data } = useQuery(GET_COMMENTS, {
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
              grids={props.grids}
            />
            <Comments
              parentId={post.id}
              server={props.server}
              grids={decrement(props.grids as number)}
            />
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default Comments;
