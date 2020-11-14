import React from "react";
import { Container, Grid } from "@material-ui/core";
import PostPreview from "../components/PostPreview";
import MakePostButton from "../components/MakePostButton";
import { gql, useQuery } from "@apollo/client";
import CommunityDesc from "../components/CommunityDesc";
import CommunityHeader from "../components/CommunityHeader";

const HomePage = () => {
  const GET_POSTS = gql`
    query GET_POSTS {
      getPosts(community: { id: "all", host: "localhost:8080" }) {
        id
        title
        author {
          id
        }
      }
    }
  `;

  const desc = "Homepage of Unifed";

  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <h1 style={{ color: "black" }}>Loading Homepage...</h1>;
  if (error) return <h1 style={{ color: "black" }}>Error! ${error.message} </h1>;

  return (
    <div>
      <CommunityHeader title="Home" />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item container xs={8} direction="column" spacing={2}>
            {data.getPosts.map((post: any) => {
              return (
                <PostPreview
                  key={post}
                  username={post.author.id}
                  title={post.title}
                  postId={post.id}
                />
              );
            })}
          </Grid>

          <Grid item container xs={4} direction="column" spacing={2}>
            <MakePostButton />
            <CommunityDesc desc={desc} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
