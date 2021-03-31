/*
 * CS3099 Group A3
 */

import { gql, useQuery } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { Button, Checkbox, List, ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LoadingCard, PostPreview } from "../../components";

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
      host
    }
  }
`;

export const QueueTab = (): JSX.Element => {
  const classes = useStyles();
  const { loading: loadingQuery, data: queryData } = useQuery(GET_UNAPPROVED_POSTS);
  if (loadingQuery) return <LoadingCard />;

  console.log(queryData);
  const unapprovedPosts = queryData.getUnapprovedPosts;
  return (
    <Formik
      initialValues={{
        selected: [],
        btn: "",
      }}
      onSubmit={async (values) => {
        console.log(values);
        const selectedPosts = values.selected.map((val: string) => {
          const split = val.split(" ", 2);
          return {
            id: split[0],
            host: split[1],
          };
        });
        alert(JSON.stringify(selectedPosts));
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
                <PostPreview
                  username={post.author.id}
                  title={post.title}
                  id={post.id}
                  server={post.host}
                  community={post.community.id}
                  body={post.body}
                />
              </ListItem>
            ))}
          </List>
        </Form>
      )}
    </Formik>
  );
};
