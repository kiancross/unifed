/*
 * CS3099 Group A3
 */

import React, { useState, ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { Redirect } from "react-router-dom";
import MarkdownEditor from "../../components/MarkdownEditor";
import { Button, Card, CardContent, Grid, TextField } from "@material-ui/core";
import CenteredLoader from "../../components/CenteredLoader";
import ErrorPage from "../ErrorPage";

interface Params {
  server: string;
  community: string;
}

const PostEditor = (props: Params): ReactElement => {
  const [content, setContent] = useState("");

  const MAKE_POST = gql`
    mutation CREATE_POST($title: String!, $body: String!, $community: String!, $host: String!) {
      createPost(post: { community: { id: $community, host: $host }, title: $title, body: $body }) {
        id
      }
    }
  `;

  const [makePost, { loading, error, data }] = useMutation(MAKE_POST);

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorPage message="The post could not be made. Please try again later." />;
  if (data) {
    const url = `/instances/${props.server}/communities/${props.community}/posts/${data.createPost.id}`;
    return <Redirect to={url} />;
  }

  const initialValues = {
    title: "",
  };

  interface postValues {
    title: string;
  }

  const handleClick = (values: postValues) => {
    const title = values.title;

    try {
      makePost({
        variables: {
          title: title,
          body: content,
          community: props.community,
          host: props.server,
        },
      });
    } catch (e) {
      alert("Post could not be made");
    }
  };

  return (
    <Grid item id="postEditor">
      <Card>
        <CardContent>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: any) => {
              handleClick(values);
            }}
          >
            <Form style={{ display: "block" }}>
              <div style={{ margin: "0px 0px 10px 0px", color: "black" }}>
                <Field
                  name="title"
                  as={TextField}
                  label="Title"
                  required
                  multiline
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </div>

              <MarkdownEditor
                style={{ height: "400px" }}
                onChange={({ text }) => setContent(text)}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                style={{ marginTop: "8px" }}
              >
                Submit Post
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostEditor;
