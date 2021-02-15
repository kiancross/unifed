/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import CenteredLoader from "../../components/CenteredLoader";
import ErrorMessage from "../ErrorMessage";
import PostEditorBase from "../PostEditorBase";

interface Params {
  server: string;
  community: string;
  submitButtonText: string;
  parentId?: string;
  isComment?: boolean;
  onSuccess: (id: string) => void;
}

export const createPostQuery = gql`
  mutation CREATE_POST(
    $title: String
    $body: String!
    $community: String!
    $host: String!
    $parentPost: String
  ) {
    createPost(
      post: {
        community: { id: $community, host: $host }
        title: $title
        body: $body
        parentPost: $parentPost
      }
    ) {
      id
    }
  }
`;

const PostCreator = (props: Params): ReactElement => {
  const [createPost, { loading, error }] = useMutation(createPostQuery);

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorMessage message="The post could not be made. Please try again later." />;

  return (
    <PostEditorBase
      isComment={props.isComment}
      onSubmit={async ({ title, body }) => {
        const response = await createPost({
          variables: {
            title,
            body,
            community: props.community,
            host: props.server,
            parentPost: props.parentId,
          },
        });

        if (response.data?.createPost) {
          props.onSuccess(response.data.createPost.id);
        }
      }}
      submitButtonText={props.submitButtonText}
    />
  );
};

export default PostCreator;
