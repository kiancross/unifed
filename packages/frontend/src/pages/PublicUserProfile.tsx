import React from "react";
import { Container, Grid } from "@material-ui/core";
import UserInfoCard from "./../components/UserInfoCard";
import { useParams } from "react-router-dom";
import PostPreview from "../components/PostPreview";

interface PublicUserProfileParams {
  username: string;
}

const PublicUserProfile = (): JSX.Element => {
  const { username } = useParams<PublicUserProfileParams>();
  // hardcoded js123 as the only valid user for now - needs changing
  const name = username === "js123" ? "John Smith" : username;
  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item container xs={8} direction="column" spacing={2}>
          <PostPreview postId="" server="" community="" username={username} title="Example Title" />
        </Grid>
        <Grid item container xs={4} direction="column" spacing={2}>
          <UserInfoCard username={username} name={name} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PublicUserProfile;
