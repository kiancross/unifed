/*
 * CS3099 Group A3
 */

import { Grid } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

import { LoadingCard, PostPreview } from "../../components";
import { ReactElement } from "react";

/**
 * Interface defining the type 'Post'.
 */
interface Post {
  id: string;
  title: string;
  author: {
    id: string;
  };
  body: string;
  community: {
    id: string;
  };
  host: string;
}

/**
 * GraphQL query to get the posts from communities that a user is subscribed to.
 */
export const getSubscribedQuery = gql`
  query {
    getSubscribedPosts {
      id
      title
      author {
        id
      }
      body
      community {
        id
      }
      host
    }
  }
`;

/**
 * Displays the previews of posts from communities that the user is subscribed to.
 *
 * @internal
 */
export function SubscribedPosts(): ReactElement {
  const { loading, error, data } = useQuery(getSubscribedQuery);
  if (error) return <Grid item />;
  if (loading) return <LoadingCard />;

  return (
    <Grid item container spacing={1}>
      {data.getSubscribedPosts
        .filter((post: Post) => post.title)
        .map((post: Post) => {
          return (
            <PostPreview
              body={post.body}
              key={post.id}
              username={post.author.id}
              title={post.title}
              id={post.id}
              host={post.host}
              community={post.community.id}
            />
          );
        })}
    </Grid>
  );
}
