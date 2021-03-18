/*
 * CS3099 Group A3
 */

import { useParams } from "react-router-dom";
import { Container, Grid, useMediaQuery } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import UserInfoCard from "../../components/UserInfoCard";
import PostPreview from "../../components/PostPreview";
import CenteredLoader from "../../components/CenteredLoader";

interface PublicUserProfileParams {
  username: string;
}

export const GET_POSTS = gql`
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

const UserProfilePage = (): JSX.Element => {
  const { username } = useParams<PublicUserProfileParams>();
  const name = username;
  const isMobile = useMediaQuery("(max-width: 960px)");
  const direction = isMobile ? "column-reverse" : "row";

  const all = useQuery(GET_POSTS, {
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
        <Grid item container xs={12} md={4} direction="column" spacing={2}>
          <UserInfoCard username={username} name={name} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfilePage;
