/*
 * CS3099 Group A3
 */

import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import PostPreview from "components/PostPreview";
import CommunityDescription from "./CommunityDescription";
import CommunityHeader from "./CommunityHeader";
import CenteredLoader from "components/CenteredLoader";

interface Params {
  server: string;
  community: string;
}

const CommunityPostsPage = () => {
  const { community, server } = useParams<Params>();

  const GET_POSTS = gql`
    query($community: String!, $host: String!) {
      getPosts(community: { id: $community, host: $host }) {
        id
        title
        author {
          id
        }
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

  if (error) return <h1 style={{ color: "black" }}>Error! </h1>;
  if (loading) return <CenteredLoader />;

  return (
    <div>
      <CommunityHeader title={data.getCommunity.title} server={server} />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item container xs={8} direction="column" spacing={2}>
            {data.getPosts
              .filter((post: any) => post.title)
              .map((post: any) => {
                return (
                  <PostPreview
                    key={post.id}
                    username={post.author.id}
                    title={post.title}
                    postId={post.id}
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
