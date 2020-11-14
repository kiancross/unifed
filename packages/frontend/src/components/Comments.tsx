import React from "react";
import { gql, useQuery } from "@apollo/client";
import Comment from "./Comment";
import { Container, Grid } from "@material-ui/core";

interface CommentParams {
  parentId: string;
}

const Comments = (props: CommentParams) => {
  const parentId = props.parentId;

  const GET_COMMENTS = gql`
    query GET_COMMENTS($id: String!) {
      getPost(post: { id: $id, host: "localhost:8080" }) {
        children {
          body
          author {
            id
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { id: parentId },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error! ${error.message} </h1>;

  const commentPosts = data.getPost.children;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item container xs={8} direction="column" spacing={2}>
          {commentPosts.map((post: any) => {
            const username = post.author.id;
            const text = post.body;
            return <Comment key={post} username={username} text={text} title="" />;
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Comments;
