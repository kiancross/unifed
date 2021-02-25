/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import PostEditorBase from "../PostEditorBase";
import CenteredLoader from "../CenteredLoader";
import ErrorMessage from "../ErrorMessage";

interface Props {
  server: string;
  id: string;
  body: string;
  title?: string;
  isComment?: boolean;
  submitButtonText: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const editPostQuery = gql`
  mutation($id: String!, $host: String!, $body: String!, $title: String) {
    updatePost(post: { id: $id, host: $host }, body: $body, title: $title) {
      id
      title
      body
    }
  }
`;

export default function PostEditor(props: Props): ReactElement {
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
        await editPost({
          variables: {
            id: props.id,
            host: props.server,
            title,
            body,
          },
        });
        if (props.onSuccess) {
          props.onSuccess();
        }
      }}
      submitButtonText={props.submitButtonText}
    />
  );
}
