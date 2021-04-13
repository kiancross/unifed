/*
 * CS3099 Group A3
 */

import { useState } from "react";
import { gql, Reference, useQuery, useMutation } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { Button, Checkbox, List, ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Comment, LoadingCard, PostPreview } from "../../components";

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

export const GET_UNAPPROVED_POSTS = gql`
  query GET_UNAPPROVED_POSTS {
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

export const approvePostsMutation = gql`
  mutation($posts: [RemoteReferenceInput!]!) {
    approvePosts(posts: $posts)
  }
`;

export const deletePostsMutation = gql`
  mutation($posts: [RemoteReferenceInput!]!) {
    deletePosts(posts: $posts)
  }
`;

export const QueueTab = (): JSX.Element => {
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

  const { loading: loadingQuery, data: queryData } = useQuery(GET_UNAPPROVED_POSTS);
  const [approvePosts] = useMutation(approvePostsMutation, updateCache);
  const [deletePosts] = useMutation(deletePostsMutation, updateCache);

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
              <Button
                type="submit"
                style={{ marginRight: "1rem" }}
                variant="contained"
                color="primary"
                onClick={() => setFieldValue("btn", "approve")}
              >
                Approve
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => setFieldValue("btn", "remove")}
              >
                Remove
              </Button>
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
                    server={post.host}
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
};
