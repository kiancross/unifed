import React from "react";
import { Container, Grid } from "@material-ui/core";
import Post from "./../components/Post";
import { useParams } from "react-router-dom";
import CommentEditor from "./../components/CommentEditor";
import { gql, useQuery } from "@apollo/client";
import Comments from "../components/Comments";
import UserInfoCard from "./../components/UserInfoCard";

interface PostParams {
  server: string;
  community: string;
  post: string;
}

const PostPage = (): JSX.Element => {
  const { post, server } = useParams<PostParams>();

  const GET_POST = gql`
    query GET_POST($id: String!, $host: String!) {
      getPost(post: { id: $id, host: $host }) {
        title
        body
        author {
          id
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: post, host: server },
  });

  if (loading) return <h1 style={{ color: "black" }}>Loading...</h1>;
  if (error) return <h1 style={{ color: "black" }}>Error! ${error.message} </h1>;

  const postData = data.getPost;
  const username = postData.author.id;
  const body = postData.body;
  const title = postData.title;

  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item container xs={8} direction="column" spacing={2}>
          <Post username={username} text={body} title={title} />
          <CommentEditor parentId={post} parentTitle={title} server={server} />
          <Comments parentId={post} server={server} />
        </Grid>

        <Grid item container xs={4} direction="column" spacing={2}>
          <UserInfoCard username={username} name={username} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostPage;
