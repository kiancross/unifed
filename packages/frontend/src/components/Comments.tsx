import React from "react";
import { gql, useQuery } from "@apollo/client";
import Comment from "./Comment";
import { Grid } from "@material-ui/core";
import LoadingComponent from "./LoadingComponent";

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

  if (error) return <h1>Error! ${error.message} </h1>;
  if (loading) return <LoadingComponent />;

  const commentPosts = data.getPost.children;

  return (
    <Grid item container xs={12} direction="column">
      {commentPosts.map((post: any) => {
        const username = post.author.id;
        const text = post.body;
        return (
          <div key={post.id} style={{ paddingTop: "4px" }}>
            <Comment username={username} text={text} title="" id={post.id} />
          </div>
        );
      })}
    </Grid>
  );
};

export default Comments;
