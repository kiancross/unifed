/*
 * CS3099 Group A3
 */

import React from "react";
import { gql, useQuery } from "@apollo/client";
import Comment from "./Comment";
import { Grid } from "@material-ui/core";
import CenteredLoader from "../../components/CenteredLoader";

interface CommentParams {
  server: string;
  parentId: string;
  grids: 8 | 9 | 10 | 11;
}

interface PostParams {
  id: string;
  body: string;
  author: {
    id: string;
  };
}

const Comments = (props: CommentParams) => {
  const parentId = props.parentId;
  const server = props.server;

  const GET_COMMENTS = gql`
    query GET_COMMENTS($id: String!, $server: String!) {
      getPost(post: { id: $id, host: $server }) {
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

  const decrement = (grids: 8 | 9 | 10 | 11): 8 | 9 | 10 | 11 => {
    switch (grids) {
      case 11:
        return 10;
        break;
      case 10:
        return 9;
        break;
      case 9:
        return 8;
        break;
      default:
        return grids;
        break;
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
          <React.Fragment>
            <Comment
              key={post.id}
              host={server}
              username={username}
              body={text}
              title=""
              id={post.id}
              grids={props.grids}
            />
            <Comments parentId={post.id} server={props.server} grids={decrement(props.grids)} />
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default Comments;
