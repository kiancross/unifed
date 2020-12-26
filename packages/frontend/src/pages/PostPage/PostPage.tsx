/*
 * CS3099 Group A3
 */

import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Post from "components/Post";
import CommentEditor from "components/CommentEditor";
import Comments from "components/Comments";
import UserInfoCard from "components/UserInfoCard";
import LoadingPage from "components/LoadingPage";
import style from "./PostPage.module.scss";

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

  if (error) return <h1 style={{ color: "black" }}>Error! ${error.message} </h1>;
  if (loading) return <LoadingPage />;

  const postData = data.getPost;
  const username = postData.author.id;
  const body = postData.body;
  const title = postData.title;

  return (
    <Container className={style.container}>
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