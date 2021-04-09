/*
 * CS3099 Group A3
 */

import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Container, Grid, useMediaQuery } from "@material-ui/core";

import { PostCreator, UserInfoCard, CenteredLoader } from "../../components";
import { Post } from "./Post";
import { Comments } from "./Comments";
import { ReactElement } from "react";

interface PostParams {
  server: string;
  community: string;
  post: string;
}

/**
 * GraphQL query to get a post with a given ID on a given host.
 */
export const getPostQuery = gql`
  query GET_POST($id: String!, $host: String!) {
    getPost(post: { id: $id, host: $host }) {
      id
      title
      body
      author {
        id
      }
    }
  }
`;

export function PostPage(): ReactElement {
  const { post, server, community } = useParams<PostParams>();
  const { loading, error, data } = useQuery(getPostQuery, {
    variables: { id: post, host: server },
  });
  const isMobile = useMediaQuery("(max-width: 960px)");
  const direction = isMobile ? "column-reverse" : "row";

  if (error) return <h1 style={{ color: "black" }}>Error! ${error.message} </h1>;
  if (loading) return <CenteredLoader />;

  const postData = data.getPost;
  const username = postData.author.id;
  const body = postData.body;
  const title = postData.title;

  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <Grid alignContent="center" container direction={direction} spacing={3}>
        <Grid item container xs={12} md={8} direction="column" spacing={2}>
          <Post
            community={community}
            id={post}
            server={server}
            username={username}
            body={body}
            title={title}
          />
          <PostCreator
            isComment
            parentId={post}
            server={server}
            community={community}
            submitButtonText="Add Comment"
            onSuccess={() => null}
          />
          <Comments community={community} parentId={post} server={server} grids={12} />
        </Grid>

        <Grid item container xs={12} md={4} direction="column" spacing={2}>
          <UserInfoCard username={username} name={username} />
        </Grid>
      </Grid>
    </Container>
  );
}
