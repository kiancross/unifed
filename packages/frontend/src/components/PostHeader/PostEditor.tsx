/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import CenteredLoader from "../CenteredLoader";
import ErrorPage from "../../pages/ErrorPage";
import EditorForm from "../EditorForm";

interface Params {
  server: string;
  id: string;
  title: string;
  body: string;
}

const PostEditor = (props: Params): ReactElement => {
  const EDIT_POST = gql`
    mutation($id: String!, $host: String!, $body: String!, $title: String!) {
      updatePost(content: { body: $body, title: $title }, post: { id: $id, host: $host })
    }
  `;

  const [editPost, { loading, data, error }] = useMutation(EDIT_POST);

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorPage message="The post could not be edited. Please try again later." />;
  if (data) window.location.reload();

  const handleClick = (content: string, values: any) => {
    editPost({
      variables: {
        id: props.id,
        host: props.server,
        body: content,
        title: values.title,
      },
    });
  };

  return (
    <EditorForm
      title={props.title}
      onSubmit={handleClick}
      body={props.body}
      buttonMessage="Edit Post"
    />
  );
};

export default PostEditor;
