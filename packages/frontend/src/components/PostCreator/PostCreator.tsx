/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import { PostEditorBase } from "..";
import { GET_POSTS } from "../../pages/CommunityPostsPage/CommunityPostsPage";

interface Params {
  server: string;
  community: string;
  submitButtonText: string;
  parentId?: string;
  isComment?: boolean;
  onSuccess: (id: string) => void;
  onCancel?: () => void;
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

export const PostCreator = (props: Params): ReactElement => {
  const [createPost, { loading, error }] = useMutation(createPostQuery, {
    update(cache, { data: { createPost } }) {
      const variables = {
        community: props.community,
        host: props.server,
      };

      const current = cache.readQuery<any>({ query: GET_POSTS, variables });

      if (current) {
        cache.writeQuery({
          query: GET_POSTS,
          variables,
          data: {
            getPosts: [...(current.getPosts || []), createPost],
          },
        });
      }

      if (props.parentId) {
        cache.modify({
          id: `Post:${props.parentId}`,
          fields: {
            children: (existing = []) => [...existing, createPost],
          },
        });
      }
    },
  });

  return (
    <PostEditorBase
      isComment={props.isComment}
      onCancel={props.onCancel}
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
      loading={loading}
      error={error}
      errorMessage="The post could not be made. Please try again later."
    />
  );
};
