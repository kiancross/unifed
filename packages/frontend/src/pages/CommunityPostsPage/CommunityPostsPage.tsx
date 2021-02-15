/*
 * CS3099 Group A3
 */

import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import PostPreview from "../../components/PostPreview";
import CommunityDescription from "./CommunityDescription";
import CommunityHeader from "./CommunityHeader";
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
        host
        id
        title
        description
      }
      getSubscriptions {
        id
        host
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

  const isSubscribed = data.getSubscriptions.some(
    (e: { host: string; id: string }) => e.host === data.getCommunity.host && e.id === community,
  );

  return (
    <div>
      <CommunityHeader
        id={data.getCommunity.id}
        title={data.getCommunity.title}
        server={server}
        isSubscribed={isSubscribed}
      />
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
              <Button
                fullWidth
                color="primary"
                variant="contained"
                href={`/instances/${server}/communities/${community}/posts/create`}
              >
                {" "}
                Make Post{" "}
              </Button>
            </Grid>
            <CommunityDescription desc={data.getCommunity.description} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CommunityPostsPage;
