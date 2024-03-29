/*
 * Copyright (C) 2021 Allan Mathew Chacko
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Grid } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

import { LoadingCard, PostPreview, ErrorMessage } from "../../components";
import { ReactElement } from "react";

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
 *
 * @internal
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
  if (error)
    return (
      <ErrorMessage message="Your subscribed posts could not be retrieved at this time. Please try again later." />
    );
  if (loading) return <LoadingCard />;

  return (
    <Grid item container spacing={2}>
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
