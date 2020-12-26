/*
 * CS3099 Group A3
 */

import React from "react";
import { Container, Grid } from "@material-ui/core";
import UserInfoCard from "./../components/UserInfoCard";
import { useParams } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import { gql, useQuery } from "@apollo/client";
import LoadingPage from "../components/LoadingPage";

interface PublicUserProfileParams {
  username: string;
}

const PublicUserProfile = (): JSX.Element => {
  const GET_POSTS = gql`
    query($community: String!, $host: String!) {
      getPosts(community: { id: $community, host: $host }) {
        id
        title
        host
        author {
          id
        }
      }
    }
  `;

  const general = useQuery(GET_POSTS, {
    variables: {
      community: "general",
      host: window.location.host,
    },
  });

  const all = useQuery(GET_POSTS, {
    variables: {
      community: "all",
      host: window.location.host,
    },
  });

  const elections = useQuery(GET_POSTS, {
    variables: {
      community: "elections",
      host: window.location.host,
    },
  });

  const { username } = useParams<PublicUserProfileParams>();
  const name = username;

  if (elections.error || all.error || general.error)
    return <h1 style={{ color: "black" }}>Error! </h1>;
  if (elections.loading || all.loading || general.loading) return <LoadingPage />;

  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item container xs={8} direction="column" spacing={2}>
          {elections.data.getPosts.map((post: any) => {
            if (post.title && post.author.id === username) {
              return (
                <PostPreview
                  key={post.id}
                  postId={post.id}
                  server={post.host}
                  community="elections"
                  username={username}
                  title={post.title}
                />
              );
            } else {
              return null;
            }
          })}
          {general.data.getPosts.map((post: any) => {
            if (post.title && post.author.id === username) {
              return (
                <PostPreview
                  key={post.id}
                  postId={post.id}
                  server={post.host}
                  community="general"
                  username={username}
                  title={post.title}
                />
              );
            } else {
              return null;
            }
          })}
          {all.data.getPosts.map((post: any) => {
            if (post.title && post.author.id === username) {
              return (
                <PostPreview
                  key={post.id}
                  postId={post.id}
                  server={post.host}
                  community="all"
                  username={username}
                  title={post.title}
                />
              );
            } else {
              return null;
            }
          })}
        </Grid>
        <Grid item container xs={4} direction="column" spacing={2}>
          <UserInfoCard username={username} name={name} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PublicUserProfile;
