/*
 * CS3099 Group A3
 */

import { gql, useMutation } from "@apollo/client";
import { ReactElement } from "react";
import { CenteredLoader, ErrorMessage, PostEditorBase } from "..";

/**
 * Properties for the [[`PostEditor`]] component.
 */
export interface PostEditorProps {
  /**
   * host of the post to edit.
   */
  host: string;

  /**
   * ID of the post to edit.
   */
  id: string;

  /**
   * The existing body of the post or comment.
   */
  body: string;

  /**
   * The existing title of the post.
   *
   * This is null if it is comment.
   */
  title?: string;

  /**
   * True if a comment is being edited, false otherwise.
   */
  isComment?: boolean;

  /**
   * Text to be displayed on the submit button.
   */
  submitButtonText: string;

  /**
   * Function to be carried out when the submit button is clicked.
   */
  onSuccess: () => void;

  /**
   * Function to be carried out when the cancel button is clicked.
   */
  onCancel: () => void;
}

/**
 * GraphQL query to edit the post using the body and title passed to it.
 */
export const editPostQuery = gql`
  mutation($id: String!, $host: String!, $body: String!, $title: String) {
    updatePost(post: { id: $id, host: $host }, body: $body, title: $title) {
      id
      title
      body
    }
  }
`;

/**
 * Used to edit existing posts or comments.
 *
 * Outline:
 *
 *  - The MarkdownEditor is used to edit the post or comment.
 *
 *  - The current content of the post or comment is displayed initially.
 *
 * @param props Properties passed to the component. See [[`PostEditorProps`]].
 *
 * @internal
 */
export function PostEditor(props: PostEditorProps): ReactElement {
  const [editPost, { loading, error }] = useMutation(editPostQuery, { onError: () => null });

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorMessage message="Could not edit comment. Please try again later." />;

  return (
    <PostEditorBase
      isComment={props.isComment}
      body={props.body}
      title={props.title}
      onCancel={props.onCancel}
      onSubmit={async ({ title, body }) => {
        const result = await editPost({
          variables: {
            id: props.id,
            host: props.host,
            title,
            body,
          },
        });
        if (result.data && props.onSuccess) {
          props.onSuccess();
        }
      }}
      submitButtonText={props.submitButtonText}
    />
  );
}
