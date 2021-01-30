/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import CenteredLoader from "../../components/CenteredLoader";
import ErrorPage from "../ErrorPage";
import EditorForm from "../../components/EditorForm";

interface Params {
  server: string;
  community: string;
}

const PostCreator = (props: Params): ReactElement => {
  const MAKE_POST = gql`
    mutation CREATE_POST($title: String!, $body: String!, $community: String!, $host: String!) {
      createPost(post: { community: { id: $community, host: $host }, title: $title, body: $body }) {
        id
      }
    }
  `;

  const [makePost, { loading, error, data }] = useMutation(MAKE_POST);

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorPage message="The post could not be made. Please try again later." />;
  if (data) {
    const url = `/instances/${props.server}/communities/${props.community}/posts/${data.createPost.id}`;
    return <Redirect to={url} />;
  }

  interface postValues {
    title: string;
  }

  const handleClick = (content: string, values: postValues) => {
    const title = values.title;

    makePost({
      variables: {
        title: title,
        body: content,
        community: props.community,
        host: props.server,
      },
    });
  };

  return <EditorForm onSubmit={handleClick} buttonMessage="Submit Post" />;
};

export default PostCreator;
