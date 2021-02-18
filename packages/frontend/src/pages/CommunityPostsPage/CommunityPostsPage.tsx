/*
 * CS3099 Group A3
 */

import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import PostPreview from "../../components/PostPreview";
import CommunityDescription from "./CommunityDescription";
import { ButtonLink } from "../../components/Links";
import CenteredLoader from "../../components/CenteredLoader";
import ErrorMessage from "../../components/ErrorMessage";

interface Params {
  server: string;
  community: string;
}

const CommunityPostsPage = (): JSX.Element => {
  const { community, server } = useParams<Params>();

  const GET_POSTS = gql`
    query($community: String!, $host: String!) {
      getPosts(community: { id: $community, host: $host }) {
        id
        title
        author {
          id
        }
        body
      }
      getCommunity(community: { id: $community, host: $host }) {
        id
        title
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      community,
      host: server,
    },
  });

  if (error) {
    return <ErrorMessage message="The posts from this community could not be retrieved." />;
  }
  if (loading) return <CenteredLoader />;

  return (
    <div style={{ paddingTop: "15px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item container xs={8} direction="column" spacing={2}>
            {data.getPosts
              .filter((post: any) => post.title)
              .map((post: any) => {
                return (
                  <PostPreview
                    body={post.body}
                    key={post.id}
                    username={post.author.id}
                    title={post.title}
                    id={post.id}
                    server={server}
                    community={community}
                  />
                );
              })}
          </Grid>

          <Grid item container xs={4} direction="column" spacing={2}>
            <Grid item>
              <ButtonLink
                fullWidth
                color="primary"
                variant="contained"
                to={`/instances/${server}/communities/${community}/posts/create`}
              >
                Make Post
              </ButtonLink>
            </Grid>
            <CommunityDescription
              title={data.getCommunity.title}
              server={server}
              desc={data.getCommunity.description}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CommunityPostsPage;
