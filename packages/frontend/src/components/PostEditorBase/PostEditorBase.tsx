/*
 * CS3099 Group A3
 */

import { Formik, Form, Field, FieldProps } from "formik";
import { ButtonGroup, Button, TextField } from "@material-ui/core";
import { ActionButton, MarkdownEditor } from "..";
import { ReactElement } from "react";
import { ApolloError } from "@apollo/client/errors";

/**
 * Properties for the [[`PostEditorBase`]] component.
 *
 * @internal
 */
export interface PostEditorBaseProps {
  /**
   * The existing title of the post if it is being edited.
   *
   * This is always `undefined` if it is a comment.
   */
  title?: string;

  /**
   * The existing body of the post or comment if it is being edited, `undefined` otherwise.
   */
  body?: string;

  /**
   * True if a comment is being edited, false otherwise.
   */
  isComment?: boolean;

  /**
   * Text to be displayed on the submit button.
   */
  submitButtonText: string;

  /**
   * Loading state to be passed to the ActionButton
   */
  loading: boolean;

  /**
   * Error state to be passed to the ActionButton
   */
  error: ApolloError | undefined;

  /**
   * Error message to be passed to the ActionButton
   */
  errorMessage?: string;

  /**
   * Function to be carried out when the submit button is clicked.
   */
  onSubmit: (values: { title?: string; body?: string }) => void;

  /**
   * Function to be carried out when the cancel button is clicked.
   */
  onCancel?: () => void;
}

/**
 * Used to edit and create posts and comments.
 *
 * Outline:
 *
 *  - The [[`MarkdownEditor`]] is used to enter the content of the post or comment.
 *
 *  - Provides a consistent, reusable component with submit and cancel buttons that
 *    can be used for comments and posts.
 *
 * @param props Properties passed to the component. See [[`PostEditorBaseProps`]].
 *
 * @internal
 */
export function PostEditorBase(props: PostEditorBaseProps): ReactElement {
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
          <ActionButton
            variant="contained"
            color="primary"
            type="submit"
            loading={props.loading}
            error={props.error}
            errorMessage={props.errorMessage}
          >
            {props.submitButtonText}
          </ActionButton>
        </ButtonGroup>
      </Form>
    </Formik>
  );
}
