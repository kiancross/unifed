/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { gql, Reference, useQuery, useMutation } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { Checkbox, List, ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ActionButton, Comment, LoadingCard, PostPreview } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.text.primary,
    textAlign: "center",
  },
}));

interface PostParams {
  id: string;
  title: string;
  body: string;
  author: {
    id: string;
  };
  community: {
    id: string;
  };
  parentPost: {
    id: string;
  };
  host: string;
}

/**
 * GraphQL query to get the unapproved posts from communities that the user moderates.
 *
 * @internal
 */
export const getUnapprovedPostsQuery = gql`
  query getUnapprovedPostsQuery {
    getUnapprovedPosts {
      id
      title
      body
      author {
        id
      }
      community {
        id
      }
      parentPost {
        id
      }
      host
    }
  }
`;

/**
 * GraphQL mutation to approve a list of posts.
 *
 * @internal
 */
export const approvePostsMutation = gql`
  mutation($posts: [RemoteReferenceInput!]!) {
    approvePosts(posts: $posts)
  }
`;

/**
 * GraphQL mutation to delete a list of posts.
 *
 * @internal
 */
export const deletePostsMutation = gql`
  mutation($posts: [RemoteReferenceInput!]!) {
    deletePosts(posts: $posts)
  }
`;

/**
 * Allows community administrators to approve or remove unapproved content on their communities
 *
 * Outline:
 *
 *  - If approve or remove is successful, the selected posts are removed from the moderation queue.
 *
 * @internal
 */
export function QueueTab(): ReactElement {
  const classes = useStyles();
  const [selectedPosts, setSelectedPosts] = useState<{ id: string; host: string }[]>([]);

  const updateCache = {
    update: (cache: any, { data: { approvePosts, deletePosts } }: any) => {
      if (approvePosts || deletePosts) {
        cache.modify({
          fields: {
            getUnapprovedPosts(existingPosts: Reference[], { readField }: any) {
              // returns existingPosts - selectedPosts
              return existingPosts.filter(
                (existingPost) =>
                  !selectedPosts.find(
                    (selectedPost) =>
                      selectedPost.id === readField("id", existingPost) &&
                      selectedPost.host === readField("host", existingPost),
                  ),
              );
            },
          },
        });
      }
    },
  };

  const { loading: loadingQuery, data: queryData } = useQuery(getUnapprovedPostsQuery);
  const [approvePosts, { loading: loadingApprove, error: approveError }] = useMutation(
    approvePostsMutation,
    updateCache,
  );
  const [deletePosts, { loading: loadingDelete, error: deleteError }] = useMutation(
    deletePostsMutation,
    updateCache,
  );

  if (loadingQuery) return <LoadingCard />;

  const unapprovedPosts = queryData.getUnapprovedPosts;
  return (
    <Formik
      initialValues={{
        selected: [],
        btn: "",
      }}
      onSubmit={async (values) => {
        const selected = values.selected.map((val: string) => {
          const split = val.split(" ", 2);
          return {
            id: split[0],
            host: split[1],
          };
        });
        setSelectedPosts(selected);
        if (values.btn === "approve") approvePosts({ variables: { posts: selected } });
        else if (values.btn === "remove") deletePosts({ variables: { posts: selected } });
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <List classes={classes}>
            <ListItem>
              <ActionButton
                type="submit"
                style={{ width: "90px", marginRight: "1rem" }}
                variant="contained"
                color="primary"
                onClick={() => setFieldValue("btn", "approve")}
                loading={loadingApprove}
                error={approveError}
              >
                Approve
              </ActionButton>
              <ActionButton
                type="submit"
                style={{ width: "90px" }}
                variant="contained"
                color="primary"
                onClick={() => setFieldValue("btn", "remove")}
                loading={loadingDelete}
                error={deleteError}
              >
                Remove
              </ActionButton>
            </ListItem>
            {unapprovedPosts.map((post: PostParams) => (
              <ListItem key={post.id}>
                <ListItemIcon>
                  <Field
                    color="primary"
                    name="selected"
                    as={Checkbox}
                    value={post.id + " " + post.host}
                  />
                </ListItemIcon>
                {post.title ? (
                  <PostPreview
                    username={post.author.id}
                    title={post.title}
                    id={post.id}
                    host={post.host}
                    community={post.community.id}
                    body={post.body}
                  />
                ) : (
                  <Comment
                    username={post.author.id}
                    body={post.body}
                    id={post.id}
                    grids={12}
                    parent={post.parentPost.id}
                    host={post.host}
                    community={post.community.id}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Form>
      )}
    </Formik>
  );
}
