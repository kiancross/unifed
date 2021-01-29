/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import EditorForm from "../EditorForm";

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

  const [editComment, { data }] = useMutation(EDIT_COMMENT);

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
      submitFunc={handleClick}
      body={props.body}
      buttonMessage="Edit Comment"
    />
  );
}
