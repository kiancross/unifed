import React from "react";
import PostEditor from "../components/PostEditor";
import { useParams } from "react-router-dom";
import { Button, Container, Grid } from "@material-ui/core";

interface Params {
  server: string;
  community: string;
}

const MakePost = () => {
  const { community, server } = useParams<Params>();
  const href = "/instances/" + server + "/communities/" + community + "/posts";

  return (
    <Container style={{ paddingTop: "1.5rem" }} maxWidth="lg">
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

export default MakePost;
