/*
 * CS3099 Group A3
 */

import React from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Grid } from "@material-ui/core";
import PostEditor from "./PostEditor";
import style from "./CreatePostPage.module.scss";

interface Params {
  server: string;
  community: string;
}

const CreatePostPage = () => {
  const { community, server } = useParams<Params>();
  const href = "/instances/" + server + "/communities/" + community + "/posts";

  return (
    <Container className={style.container} maxWidth="lg">
      <Grid container direction="column" spacing={3}>
        <PostEditor community={community} server={server} />
        <Grid item>
          <Button href={href} variant="contained" color="primary">
            Cancel Post
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreatePostPage;
