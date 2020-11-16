import React from "react";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { Redirect } from "react-router-dom";
import MarkdownViewer from "./MarkdownViewer";

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

  if (loading) return <p>Creating Post...</p>;
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
    <div id="postEditor">
      <Formik
        initialValues={initialValues}
        onSubmit={(values: any) => {
          handleClick(values);
        }}
      >
        <Form style={{ display: "block" }}>
          <div style={{ margin: "20px", color: "black" }}>
            <label htmlFor="title">Title: </label>
            <Field name="title" />
          </div>

          <Editor
            ref={mdEditor}
            style={{
              height: "300px",
            }}
            renderHTML={(text: string) => <MarkdownViewer>{text}</MarkdownViewer>}
          />

          <button className="Submit-button" type="submit">
            Submit Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}
