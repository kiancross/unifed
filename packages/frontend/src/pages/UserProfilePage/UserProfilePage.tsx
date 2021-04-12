/*
 * CS3099 Group A3
 */

import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Container, Grid, useMediaQuery } from "@material-ui/core";

import { UserInfoCard, PostPreview, CenteredLoader } from "../../components";
import { ReactElement } from "react";

/**
 * Params taken by the [[`UserProfilePage`]] component.
 */
export interface PublicUserProfileParams {
  /**
   * The username of the profile.
   */
  username: string;
}

/**
 * GraphQL query to get the posts from a certain community on a certain host.
 */
export const getUsersPostsQuery = gql`
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

/**
 * Allows users to see the posts they have made and their information (username and name).
 *
 * @internal
 */
export function UserProfilePage(): ReactElement {
  const { username } = useParams<PublicUserProfileParams>();
  const name = username;
  const isMobile = useMediaQuery("(max-width: 960px)");
  const direction = isMobile ? "column-reverse" : "row";

  const all = useQuery(getUsersPostsQuery, {
    variables: {
      community: "all",
      host: "this",
    },
  });

  if (all.error) return <h1 style={{ color: "black" }}>Error! </h1>;
  if (all.loading) return <CenteredLoader />;

  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <Grid alignContent="center" container direction={direction} spacing={3}>
        <Grid item container xs={12} md={8} direction="column" spacing={2}>
          {all.data.getPosts.map((post: any) => {
            if (post.title && post.author.id === username) {
              return (
                <PostPreview
                  body={post.body}
                  key={post.id}
                  id={post.id}
                  host={post.host}
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
        <Grid item container xs={12} md={4} direction="column" spacing={2}>
          <UserInfoCard username={username} name={name} />
        </Grid>
      </Grid>
    </Container>
  );
}
