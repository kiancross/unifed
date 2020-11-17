import React from "react";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./../App.scss";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Grid, Button, Typography } from "@material-ui/core";
import MarkdownViewer from "./MarkdownViewer";

interface Props {
  server: string;
  parentId: string;
  parentTitle: string;
}

export default function CommentEditor(props: Props) {
  const mdEditor = React.useRef<Editor>(null);

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
    if (mdEditor.current) {
      const body = mdEditor.current.getMdValue();

      try {
        makePost({
          variables: { title: "", parentId: props.parentId, body: body, server: props.server },
        });
      } catch (err) {
        alert("Post could not be made");
      }
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
          <Editor
            ref={mdEditor}
            style={{
              height: " 170px",
            }}
            renderHTML={(text) => (
              <Typography variant="body2" style={{ textAlign: "left" }}>
                <MarkdownViewer>{text}</MarkdownViewer>
              </Typography>
            )}
          />
          <Button
            color="primary"
            disableElevation
            fullWidth
            variant="contained"
            className="Submit-button"
            type="submit"
          >
            SEND
          </Button>
        </Form>
      </Formik>
    </Grid>
  );
}
