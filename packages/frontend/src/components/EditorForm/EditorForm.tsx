import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import MarkdownEditor from "../MarkdownEditor";
import { Button, TextField } from "@material-ui/core";

interface PropsTypes {
  title?: string;
  submitFunc: (content: string, values: any) => void;
  body?: string;
  buttonMessage: string;
  isComment?: boolean;
}

const EditorForm = (props: PropsTypes): JSX.Element => {
  const [content, setContent] = useState(props.body || "");

  const initialValues = {
    title: props.title,
  };

  const height = props.isComment ? "170px" : "400px";

  const titleField = props.isComment ? null : (
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
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => {
        props.submitFunc(content, values);
      }}
    >
      <Form style={{ display: "block" }}>
        {titleField}
        <MarkdownEditor style={{ height: height }} onChange={({ text }) => setContent(text)} />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          style={{ marginTop: "8px" }}
        >
          {props.buttonMessage}
        </Button>
      </Form>
    </Formik>
  );
};

export default EditorForm;
