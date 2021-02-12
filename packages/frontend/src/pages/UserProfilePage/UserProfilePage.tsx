/*
 * CS3099 Group A3
 */

import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import UserInfoCard from "../../components/UserInfoCard";
import PostPreview from "../../components/PostPreview";
import CenteredLoader from "../../components/CenteredLoader";

interface PublicUserProfileParams {
  username: string;
}

const UserProfilePage = (): JSX.Element => {
  const GET_POSTS = gql`
    query($community: String!, $host: String!) {
      getPosts(community: { id: $community, host: $host }) {
        id
        title
        host
        author {
          id
        }
        body
      }
    }
  `;

  const general = useQuery(GET_POSTS, {
    variables: {
      community: "general",
      host: process.env.REACT_APP_INTERNAL_REFERENCE,
    },
  });

  const all = useQuery(GET_POSTS, {
    variables: {
      community: "all",
      host: process.env.REACT_APP_INTERNAL_REFERENCE,
    },
  });

  const elections = useQuery(GET_POSTS, {
    variables: {
      community: "elections",
      host: process.env.REACT_APP_INTERNAL_REFERENCE,
    },
  });

  const { username } = useParams<PublicUserProfileParams>();
  const name = username;

  if (elections.error || all.error || general.error)
    return <h1 style={{ color: "black" }}>Error! </h1>;
  if (elections.loading || all.loading || general.loading) return <CenteredLoader />;

  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item container xs={8} direction="column" spacing={2}>
          {elections.data.getPosts.map((post: any) => {
            if (post.title && post.author.id === username) {
              return (
                <PostPreview
                  body={post.body}
                  key={post.id}
                  id={post.id}
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
                  body={post.body}
                  key={post.id}
                  id={post.id}
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
                  body={post.body}
                  key={post.id}
                  id={post.id}
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

export default UserProfilePage;
