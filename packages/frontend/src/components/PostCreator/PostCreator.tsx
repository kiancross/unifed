/*
 * CS3099 Group A3
 */

import { gql, useMutation } from "@apollo/client";
import { ReactElement } from "react";
import { Grid } from "@material-ui/core";
import { PostEditorBase } from "..";
import { getPostsQuery } from "../../pages/CommunityPostsPage/CommunityPostsPage";

/**
 * Properties for the [[`PostCreator`]] component.
 *
 * @internal
 */
export interface PostCreatorProps {
  /**
   * The host the post will be made to.
   */
  host: string;

  /**
   * The community the post will be made in.
   */
  community: string;

  /**
   * The text to be displayed on the 'submit' button.
   *
   * This is either 'Create Post', 'Make Reply' or 'Add Comment'.
   */
  submitButtonText: string;

  /**
   * The ID of the parent post, if a comment is being made.
   */
  parentId?: string;

  /**
   * Indicates whether a comment is being made.
   */
  isComment?: boolean;

  /**
   * Function called upon successful submission.
   */
  onSuccess: (id: string) => void;

  /**
   * Function called if the component is closed without creating a comment.
   */
  onCancel?: () => void;
}

/**
 * GraphQL query to create a post.
 *
 * @internal
 */
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

/**
 * Used to create posts.
 *
 * Outline:
 *
 *  - The [[`MarkdownEditor`]] is used to curate the content of the post.
 *
 *  - Users can click the submit button to create the post or the cancel button to leave the creator.
 *
 * @param props Properties passed to the component. See [[`PostCreatorProps`]].
 *
 * @internal
 */
export function PostCreator(props: PostCreatorProps): ReactElement {
  const [createPost, { loading, error }] = useMutation(createPostQuery, {
    onError: () => null,
    update(cache, { data: { createPost } }) {
      const variables = {
        community: props.community,
        host: props.host,
      };

      const current = cache.readQuery<any>({ query: getPostsQuery, variables });

      if (current) {
        cache.writeQuery({
          query: getPostsQuery,
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
    <Grid style={{ width: "100%" }} item>
      <PostEditorBase
        isComment={props.isComment}
        onCancel={props.onCancel}
        onSubmit={async ({ title, body }) => {
          const response = await createPost({
            variables: {
              title,
              body,
              community: props.community,
              host: props.host,
              parentPost: props.parentId,
            },
          });

          if (response?.data?.createPost) {
            props.onSuccess(response.data.createPost.id);
          }
        }}
        submitButtonText={props.submitButtonText}
        loading={loading}
        error={error}
        errorMessage="The post could not be made. Please try again later."
      />
    </Grid>
  );
}
