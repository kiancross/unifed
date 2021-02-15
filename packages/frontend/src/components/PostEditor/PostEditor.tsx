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
  mutation($id: String!, $host: String!, $body: String!, $title: String!) {
    updatePost(content: { body: $body, title: $title }, post: { id: $id, host: $host })
  }
`;

export default function PostEditor(props: Props): ReactElement {
  const [editPost, { data, loading, error }] = useMutation(editPostQuery, { onError: () => null });

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorMessage message="Could not edit comment. Please try again later." />;
  if (data && props.onSuccess) props.onSuccess();

  return (
    <PostEditorBase
      isComment={props.isComment}
      body={props.body}
      title={props.title}
      onCancel={props.onCancel}
      onSubmit={({ title, body }) => {
        editPost({
          variables: {
            id: props.id,
            host: props.server,
            title,
            body,
          },
        });
      }}
      submitButtonText={props.submitButtonText}
    />
  );
}
