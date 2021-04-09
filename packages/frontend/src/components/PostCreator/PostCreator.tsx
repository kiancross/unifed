/*
 * CS3099 Group A3
 */

import { gql, useMutation } from "@apollo/client";
import { ReactElement } from "react";
import { PostEditorBase, CenteredLoader, ErrorMessage } from "..";
import { getPostsQuery } from "../../pages/CommunityPostsPage/CommunityPostsPage";

/**
 * Properties for the [[`PostCreator`]] component.
 */
interface PostCreatorProps {
  /**
   * The server the post will be made to.
   */
  server: string;

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
   * The ID of the parent post if a comment is being made.
   */
  parentId?: string;

  /**
   * True if a comment is being made, false if a post is.
   */
  isComment?: boolean;

  /**
   * Function to be carried out upon submission.
   */
  onSuccess: (id: string) => void;

  /**
   * Function to be carried out if the creator is closed.
   */
  onCancel?: () => void;
}

/**
 * GraphQL query to creates the post using the given information.
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
 *  - The MarkdownEditor is used to curate the content of the post.
 *
 *  - Users can then click the submit button to make the post or cancel button to stop making it.
 *
 *  - Upon submitting the post, the page will be refreshed or the user is redirected to a new page.
 *
 * @param props Properties passed to the component. See [[`PostCreatorProps`]].
 *
 * @internal
 */
export function PostCreator(props: PostCreatorProps): ReactElement {
  const [createPost, { loading, error }] = useMutation(createPostQuery, {
    update(cache, { data: { createPost } }) {
      const variables = {
        community: props.community,
        host: props.server,
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

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorMessage message="The post could not be made. Please try again later." />;

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
    />
  );
}
