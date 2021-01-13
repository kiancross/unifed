/*
 * CS3099 Group A3
 */

import React, { ReactElement, useState } from "react";
import MarkdownEditor from "../../components/MarkdownEditor";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";

interface Props {
  server: string;
  parentId: string;
  parentTitle: string;
}

export default function CommentEditor(props: Props): ReactElement {
  const [content, setContent] = useState("");

  const MAKE_COMMENTS = gql`
    mutation CREATE_POST($title: String!, $parentId: String!, $body: String!, $server: String!) {
      createPost(post: { parent: { id: $parentId, host: $server }, title: $title, body: $body }) {
        id
      }
    }
  `;

  const [makePost, { data }] = useMutation(MAKE_COMMENTS);

  if (data) window.location.reload();

  const initialValues = {
    title: "",
  };

  const handleClick = () => {
    try {
      makePost({
        variables: { title: "", parentId: props.parentId, body: content, server: props.server },
      });
    } catch (err) {
      alert("Post could not be made");
    }
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
            SEND
          </Button>
        </Form>
      </Formik>
    </Grid>
  );
}
