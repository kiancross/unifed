/*
 * CS3099 Group A3
 */

import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { Button, TextField } from "@material-ui/core";
import MarkdownEditor from "../MarkdownEditor";

interface Props {
  title?: string;
  body?: string;
  submitButtonText: string;
  isComment?: boolean;
  onSubmit: (values: { title?: string; body?: string }) => void;
}

const PostEditorBase = (props: Props): JSX.Element => {
  const initialValues = {
    title: props.isComment ? undefined : props.title,
    body: props.body,
  };

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
    <Formik initialValues={initialValues} onSubmit={(values) => props.onSubmit(values)}>
      <Form style={{ display: "block" }}>
        {titleField}

        <Field name="body" required>
          {({ field }: FieldProps) => (
            <MarkdownEditor
              onChange={({ text }) => field.onChange(field.name)(text)}
              value={field.value}
              style={{
                height: props.isComment ? "170px" : "400px",
                border: 0,
              }}
            />
          )}
        </Field>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          style={{ marginTop: "8px" }}
        >
          {props.submitButtonText}
        </Button>
      </Form>
    </Formik>
  );
};

export default PostEditorBase;
