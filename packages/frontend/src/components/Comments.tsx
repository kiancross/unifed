import React from "react";
import { gql, useQuery } from "@apollo/client";
import Comment from "./Comment";
import { Grid } from "@material-ui/core";

interface CommentParams {
  server: string;
  parentId: string;
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

  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { id: parentId, server },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error! ${error.message} </h1>;

  const commentPosts = data.getPost.children;

  return (
    <Grid item container xs={12} direction="column">
      {commentPosts.map((post: any) => {
        const username = post.author.id;
        const text = post.body;
        return <Comment key={post.id} username={username} text={text} title="" />;
      })}
    </Grid>
  );
};

export default Comments;
