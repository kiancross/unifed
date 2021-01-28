/*
 * CS3099 Group A3
 */

import React, { ReactElement, useState } from "react";
import MarkdownEditor from "../MarkdownEditor";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";

interface Props {
  server: string;
  id: string;
  body: string;
}

export default function CommentEditor(props: Props): ReactElement {
  const [content, setContent] = useState("");

  const EDIT_COMMENT = gql`
    mutation($id: String!, $host: String!, $body: String!, $title: String!) {
      updatePost(content: { body: $body, title: $title }, post: { id: $id, host: $host })
    }
  `;

  const [editComment, { data }] = useMutation(EDIT_COMMENT);

  if (data) window.location.reload();

  const initialValues = {
    title: "",
  };

  const handleClick = () => {
    editComment({
      variables: {
        id: props.id,
        host: props.server,
        body: content,
        title: "",
      },
    });
  };

  return (
    <Grid item>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          handleClick();
        }}
      >
        <Form>
          <MarkdownEditor style={{ height: "170px" }} onChange={({ text }) => setContent(text)} />
          <Button
            color="primary"
            disableElevation
            fullWidth
            variant="contained"
            className="Submit-button"
            type="submit"
            style={{ marginTop: "8px" }}
          >
            Edit Comment
          </Button>
        </Form>
      </Formik>
    </Grid>
  );
}
