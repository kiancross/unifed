/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import EditorForm from "../EditorForm";
import CenteredLoader from "../CenteredLoader";
import ErrorPage from "../../pages/ErrorPage";

interface Props {
  server: string;
  id: string;
  body: string;
}

export default function CommentEditor(props: Props): ReactElement {
  const EDIT_COMMENT = gql`
    mutation($id: String!, $host: String!, $body: String!, $title: String!) {
      updatePost(content: { body: $body, title: $title }, post: { id: $id, host: $host })
    }
  `;

  const [editComment, { data, loading, error }] = useMutation(EDIT_COMMENT);

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorPage message="Could not edit comment. Please try again later." />;
  if (data) window.location.reload();

  const handleClick = (content: string) => {
    editComment({
      variables: {
        id: props.id,
        host: props.server,
        body: content,
        title: "",
      },
    });
  };

  return (
    <EditorForm
      isComment={true}
      title=""
      onSubmit={handleClick}
      body={props.body}
      buttonMessage="Edit Comment"
    />
  );
}
