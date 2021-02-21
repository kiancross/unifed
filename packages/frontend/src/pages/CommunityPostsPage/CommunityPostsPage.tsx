/*
 * CS3099 Group A3
 */

import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, useMediaQuery } from "@material-ui/core";
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
  const isMobile = useMediaQuery("(max-width: 960px)");

  const GET_POSTS = gql`
    query($community: String!, $host: String!) {
      getPosts(community: { id: $community, host: $host }) {
        id
        title
        approved
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

  const direction = isMobile ? "column-reverse" : "row";

  return (
    <div style={{ paddingTop: "15px" }}>
      <Container maxWidth="lg">
        <Grid direction={direction} container spacing={3}>
          <Grid item container xs={12} md={8} direction="column" spacing={2}>
            {data.getPosts
              .filter((post: any) => post.title && post.approved)
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

          <Grid item container xs={12} md={4} direction="column" spacing={2}>
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
            {server === "this" ? (
              <Grid item>
                <ButtonLink
                  fullWidth
                  color="primary"
                  variant="contained"
                  to={`/instances/${server}/communities/${community}/call`}
                >
                  Join Community Call
                </ButtonLink>
              </Grid>
            ) : null}
            <CommunityDescription
              title={data.getCommunity.title}
              id={community}
              server={server}
              desc={data.getCommunity.description}
              isSubscribed={isSubscribed}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CommunityPostsPage;
