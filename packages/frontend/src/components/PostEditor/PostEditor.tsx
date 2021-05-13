/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Allan Mathew Chacko
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { gql, useMutation } from "@apollo/client";
import { ReactElement } from "react";
import { CenteredLoader, ErrorMessage, PostEditorBase } from "..";

/**
 * Properties for the [[`PostEditor`]] component.
 *
 * @internal
 */
export interface PostEditorProps {
  /**
   * host of the post to edit.
   */
  host: string;

  /**
   * ID of the post to edit.
   */
  id: string;

  /**
   * The existing body of the post or comment.
   */
  body: string;

  /**
   * The existing title of the post.
   *
   * This is `undefined` if it is a comment.
   */
  title?: string;

  /**
   * Indicates if it is a comment being edited.
   */
  isComment?: boolean;

  /**
   * Text to be displayed on the submit button.
   */
  submitButtonText: string;

  /**
   * Function to be called when the post is successfully edited.
   */
  onSuccess: () => void;

  /**
   * Function to be called when the cancel button is clicked.
   */
  onCancel: () => void;
}

/**
 * GraphQL query to edit a post.
 *
 * @internal
 */
export const editPostQuery = gql`
  mutation($id: String!, $host: String!, $body: String!, $title: String) {
    updatePost(post: { id: $id, host: $host }, body: $body, title: $title) {
      id
      title
      body
    }
  }
`;

/**
 * Used to edit existing posts or comments.
 *
 * Outline:
 *
 *  - The [[`MarkdownEditor`]] is used to edit the post or comment.
 *
 *  - The current content of the post or comment is displayed initially.
 *
 * @param props Properties passed to the component. See [[`PostEditorProps`]].
 *
 * @internal
 */
export function PostEditor(props: PostEditorProps): ReactElement {
  const [editPost, { loading, error }] = useMutation(editPostQuery, { onError: () => null });

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorMessage message="Could not edit comment. Please try again later." />;

  return (
    <PostEditorBase
      isComment={props.isComment}
      body={props.body}
      title={props.title}
      onCancel={props.onCancel}
      onSubmit={async ({ title, body }) => {
        const result = await editPost({
          variables: {
            id: props.id,
            host: props.host,
            title,
            body,
          },
        });
        if (result.data && props.onSuccess) {
          props.onSuccess();
        }
      }}
      submitButtonText={props.submitButtonText}
      loading={loading}
      error={error}
      errorMessage="Could not edit comment. Please try again later."
    />
  );
}
