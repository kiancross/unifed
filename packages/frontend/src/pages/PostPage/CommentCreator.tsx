/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import EditorForm from "../../components/EditorForm";
import ErrorPage from "../ErrorPage";

interface Props {
  server: string;
  parentId: string;
  parentTitle: string;
  community: string;
}

export default function CommentCreator(props: Props): ReactElement {
  const MAKE_COMMENTS = gql`
    mutation CREATE_POST(
      $title: String!
      $community: String!
      $body: String!
      $server: String!
      $parentPost: String!
    ) {
      createPost(
        post: {
          community: { id: $community, host: $server }
          title: $title
          body: $body
          parentPost: $parentPost
        }
      ) {
        id
      }
    }
  `;

  const [makePost, { data, error }] = useMutation(MAKE_COMMENTS);

  if (error) return <ErrorPage message="Could not make comment. Please try again later" />;
  if (data) window.location.reload();

  const handleClick = (content: string) => {
    makePost({
      variables: {
        title: "",
        parentPost: props.parentId,
        body: content,
        server: props.server,
        community: props.community,
      },
    });
  };

  return <EditorForm onSubmit={handleClick} buttonMessage="Make Comment" isComment />;
}
