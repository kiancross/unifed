import React from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import "./../App.scss";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";

interface Props {
  parentId: string;
  parentTitle: string;
}

export default function CommentEditor(props: Props) {
  const mdEditor = React.useRef<Editor>(null);
  const [value, setValue] = React.useState("Write here");

  const MAKE_COMMENT = gql`
    mutation CREATE_POST($title: String!, $parentId: String!, $body: String!) {
      createPost(
        post: { parent: { id: $parentId, host: "localhost:8080" }, title: $title, body: $body }
      ) {
        id
      }
    }
  `;

  const [makePost, { data }] = useMutation(MAKE_COMMENT);

  if (data) window.location.reload();

  const initialValues = {
    title: "",
  };

  const handleClick = () => {
    if (mdEditor.current) {
      const body = mdEditor.current.getMdValue();

      try {
        const title = "Comment on " + props.parentTitle;
        makePost({ variables: { title: title, parentId: props.parentId, body: body } });
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
    <div style={{ margin: "20px", alignContent: "center" }}>
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
              height: "200px",
              width: "800px",
            }}
            onChange={handleEditorChange}
            renderHTML={(text) => <ReactMarkdown source={text} />}
          />
          <button className="Submit-button" type="submit">
            Make Comment
          </button>
        </Form>
      </Formik>
    </div>
  );
}
