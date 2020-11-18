import React from "react";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { Redirect } from "react-router-dom";
import MarkdownViewer from "./MarkdownViewer";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import LoadingComponent from "./LoadingComponent";

interface Params {
  server: string;
  community: string;
}

export default function App(props: Params) {
  const mdEditor = React.useRef<Editor>(null);

  const MAKE_POST = gql`
    mutation CREATE_POST($title: String!, $body: String!, $community: String!, $host: String!) {
      createPost(post: { parent: { id: $community, host: $host }, title: $title, body: $body }) {
        id
      }
    }
  `;

  const [makePost, { loading, error, data }] = useMutation(MAKE_POST);

  if (loading) return <LoadingComponent />;
  if (error) return <p>Error :(</p>;
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
    if (mdEditor.current) {
      const title = values.title;
      const body = mdEditor.current.getMdValue();

      try {
        makePost({
          variables: { title: title, body: body, community: props.community, host: props.server },
        });
      } catch (e) {
        alert("Post could not be made");
      }
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

              <Editor
                ref={mdEditor}
                style={{
                  height: "400px",
                }}
                renderHTML={(text: string) => (
                  <Typography variant="body2" style={{ textAlign: "left" }}>
                    <MarkdownViewer>{text}</MarkdownViewer>
                  </Typography>
                )}
              />

              <Button variant="contained" color="primary" fullWidth type="submit" style={{marginTop: "8px"}}>
                Submit Post
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </Grid>
  );
}
