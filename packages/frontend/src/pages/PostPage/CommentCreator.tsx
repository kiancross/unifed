/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import EditorForm from "../../components/EditorForm";
import CenteredLoader from "../../components/CenteredLoader";

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

  const [makePost, { data, loading }] = useMutation(MAKE_COMMENTS);

  if (loading) return <CenteredLoader />;
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

  return <EditorForm submitFunc={handleClick} buttonMessage="Make Comment" isComment />;
}
