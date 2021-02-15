/*
 * CS3099 Group A3
 */

import React, { ReactElement, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import PostCreator from "../../components/PostCreator";

interface Params {
  server: string;
  community: string;
}

const CreatePostPage = (): ReactElement => {
  const { community, server } = useParams<Params>();
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
};

export default CreatePostPage;
