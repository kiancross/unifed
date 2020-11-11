import React from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import "./../App.scss";
import {gql, useMutation} from "@apollo/client"
import { Formik, Form } from "formik";

interface Props {
    postId:String
}

export default function CommentEditor(props:Props) {
  const mdEditor = React.useRef<Editor>(null);
  const [value, setValue] = React.useState("Write here");
  const parentId = props.postId 

  const MAKE_POST = gql`
    mutation CREATE_POST($parentId:String!, $body:String!) {
      createPost(post: {parent: {id:$parentId, host:"localhost:8080"}, 
        title: "", body: $body}) {
        id
      }
    }
  `
  
  const [makePost] = useMutation(MAKE_POST)
  const initialValues = {
    title: ""
  }

  const handleClick = () => {
    if (mdEditor.current) {
      const body = mdEditor.current.getMdValue();

      try {
        makePost({variables: {parentId:parentId , body:body}})
        window.location.reload()
      }
      catch(err) {
        alert("Post could not be made")
      }
    }
  };

  const handleEditorChange = ({ text }: { text: string }) => {
    const newValue = text.replace(/\d/g, "");
    setValue(newValue);
  };

  return (
    <div>
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
            width:"500px"
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
