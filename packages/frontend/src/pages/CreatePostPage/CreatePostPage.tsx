/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Container } from "@material-ui/core";

import { PostCreator } from "../../components";

/**
 * Params taken by the [[`SubscribeButton`]] component.
 */
export interface CreatePostPageParams {
  /**
   * Server of the community the post is being made to.
   */
  server: string;

  /**
   * The name of the community the post is being made to.
   */
  community: string;
}

/**
 * Allows users to create a post to a community.
 *
 * Outline:
 *
 *  - The user can create a post using a markdown editor.
 *
 * @internal
 */
export function CreatePostPage(): ReactElement {
  const { community, server } = useParams<CreatePostPageParams>();
  const [redirect, setRedirect] = useState<string | undefined>();

  const href = "/instances/" + server + "/communities/" + community + "/posts";

  const onSuccess = (id: string) => {
    setRedirect(href + "/" + id);
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Container style={{ paddingTop: "1.5rem" }} maxWidth="lg">
      <PostCreator
        community={community}
        server={server}
        submitButtonText="Create Post"
        onSuccess={onSuccess}
      />
    </Container>
  );
}
