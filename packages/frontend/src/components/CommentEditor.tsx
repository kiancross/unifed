import React from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import "./../App.scss";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";

interface Props {
  server: string;
  parentId: string;
  parentTitle: string;
}

export default function CommentEditor(props: Props) {
  const mdEditor = React.useRef<Editor>(null);
  const [value, setValue] = React.useState("Write here");

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

  const handleEditorChange = ({ text }: { text: string }) => {
    const newValue = text.replace(/\d/g, "");
    setValue(newValue);
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
            value={value}
            style={{
              height: " 170px",
            }}
            onChange={handleEditorChange}
            renderHTML={(text) => <ReactMarkdown source={text} />}
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
