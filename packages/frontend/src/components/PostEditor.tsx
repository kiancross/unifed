import React from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import "./../App.scss";
import {gql, useMutation} from "@apollo/client"
import { Formik, Form, Field } from "formik";
import { Redirect } from "react-router-dom"


export default function App() {
  const mdEditor = React.useRef<Editor>(null);
  const [value, setValue] = React.useState("Write here");

  const MAKE_POST = gql`
    mutation CREATE_POST($title:String!, $body:String!) {
      createPost(post: {parent: {id:"all", host:"localhost:8080"}, 
        title: $title, body: $body}) {
        id
      }
    }
  `
  
  const [ makePost, { loading, error, data } ] = useMutation(MAKE_POST)

  
  if (loading) return <p>Creating Post...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    const url = "/posts/" + data.createPost.id;
    return <Redirect to={url}/>
  }

  const initialValues = {
    title: ""
  }

  interface postValues {
    title:string
  }
 

  const handleClick = (values:postValues) => {
    if (mdEditor.current) {
      const title = values.title
      const body = mdEditor.current.getMdValue();

      try {
        makePost({variables: {title:title, body:body}})
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
    <div id="postEditor">
      <Formik
        initialValues={initialValues}
        onSubmit={(values:any) => {
          handleClick(values);
        }}
      >
        <Form style={{display:"block"}}>
          <div style={{margin:"20px", color:"black"}}>
            <label htmlFor="title">Title: </label>
            <Field name="title"/>
          </div>

          <Editor
            ref={mdEditor}
            value={value}
            style={{
              height: "300px",
            }}
            onChange={handleEditorChange}
            renderHTML={(text:string) => <ReactMarkdown source={text} />}
          />

          <button className="Submit-button" type="submit">
            Make Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}
