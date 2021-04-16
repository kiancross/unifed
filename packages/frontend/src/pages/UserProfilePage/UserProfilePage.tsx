/*
 * CS3099 Group A3
 */

import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Container, Grid, useMediaQuery } from "@material-ui/core";

import { UserInfoCard, PostPreview, CenteredLoader, ErrorMessage } from "../../components";
import { ReactElement } from "react";

/**
 * Params taken by the [[`UserProfilePage`]] component.
 *
 * @internal
 */
export interface PublicUserProfileParams {
  /**
   * The username of the profile.
   */
  username: string;
}

/**
 * GraphQL query to get the posts made by a certain user.
 *
 * @internal
 */
export const getUsersPostsQuery = gql`
  query($username: String!) {
    getAllPosts(username: $username) {
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

  const posts = useQuery(getUsersPostsQuery, {
    variables: {
      username: name,
    },
  });

  if (posts.error)
    return (
      <ErrorMessage message="Your posts could not be retrieved at this time. Please try again later." />
    );
  if (posts.loading) return <CenteredLoader />;

  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <Grid alignContent="center" container direction={direction} spacing={3}>
        <Grid item container xs={12} md={8} direction="column" spacing={2}>
          {posts.data.getAllPosts.map((post: any) => {
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
