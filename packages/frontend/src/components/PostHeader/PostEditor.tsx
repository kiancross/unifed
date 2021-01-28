/*
 * CS3099 Group A3
 */

import React, { useState, ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import MarkdownEditor from "../MarkdownEditor";
import { Button, TextField } from "@material-ui/core";
import CenteredLoader from "../CenteredLoader";
import ErrorPage from "../../pages/ErrorPage";

interface Params {
  server: string;
  id: string;
  title: string;
  body: string;
}

const PostEditor = (props: Params): ReactElement => {
  const [content, setContent] = useState(props.body);

  const EDIT_POST = gql`
    mutation($id: String!, $host: String!, $body: String!, $title: String!) {
      updatePost(content: { body: $body, title: $title }, post: { id: $id, host: $host })
    }
  `;

  const [editPost, { loading, data, error }] = useMutation(EDIT_POST);

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorPage message="The post could not be edited. Please try again later." />;
  if (data) window.location.reload();

  const initialValues = {
    title: props.title,
  };

  interface postValues {
    title: string;
  }

  const handleClick = (values: postValues) => {
    editPost({
      variables: {
        id: props.id,
        host: props.server,
        body: content,
        title: values.title,
      },
    });
  };

  return (
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

        <MarkdownEditor style={{ height: "400px" }} onChange={({ text }) => setContent(text)} />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          style={{ marginTop: "8px" }}
        >
          Edit Post
        </Button>
      </Form>
    </Formik>
  );
};

export default PostEditor;
