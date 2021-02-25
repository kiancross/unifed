/*
 * CS3099 Group A3
 */

import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Post from "./Post";
import PostCreator from "../../components/PostCreator";
import Comments from "./Comments";
import UserInfoCard from "../../components/UserInfoCard";
import CenteredLoader from "../../components/CenteredLoader";

interface PostParams {
  server: string;
  community: string;
  post: string;
}

export const GET_POST = gql`
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

const PostPage = (): JSX.Element => {
  const { post, server, community } = useParams<PostParams>();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: post, host: server },
  });

  if (error) return <h1 style={{ color: "black" }}>Error! ${error.message} </h1>;
  if (loading) return <CenteredLoader />;

  const postData = data.getPost;
  const username = postData.author.id;
  const body = postData.body;
  const title = postData.title;

  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item container xs={8} direction="column" spacing={2}>
          <Post id={post} server={server} username={username} body={body} title={title} />
          <PostCreator
            isComment
            parentId={post}
            server={server}
            community={community}
            submitButtonText="Add Comment"
            onSuccess={() => null}
          />
          <Comments parentId={post} server={server} grids={11} />
        </Grid>

        <Grid item container xs={4} direction="column" spacing={2}>
          <UserInfoCard username={username} name={username} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostPage;
