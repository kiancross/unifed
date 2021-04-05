/*
 * CS3099 Group A3
 */

import { Formik, Form, Field, FieldProps } from "formik";
import { ButtonGroup, Button, TextField } from "@material-ui/core";
import { MarkdownEditor } from "..";

interface Props {
  title?: string;
  body?: string;
  isComment?: boolean;
  submitButtonText: string;
  onSubmit: (values: { title?: string; body?: string }) => void;
  onCancel?: () => void;
}

export function PostEditorBase(props: Props) {
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

        <ButtonGroup fullWidth style={{ marginBottom: "8px", marginTop: "8px" }}>
          {props.onCancel ? (
            <Button
              style={{ marginRight: "8px" }}
              variant="contained"
              color="primary"
              onClick={props.onCancel}
            >
              Cancel
            </Button>
          ) : null}
          <Button variant="contained" color="primary" type="submit">
            {props.submitButtonText}
          </Button>
        </ButtonGroup>
      </Form>
    </Formik>
  );
}
