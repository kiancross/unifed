/*
 * CS3099 Group A3
 */

import React from "react";
import { Container, Grid } from "@material-ui/core";
import WelcomeCard from "./WelcomeCard";
import CommunitiesListCard from "./CommunitiesListCard";

const HomePage = () => {
  return (
    <Container style={{ paddingTop: "1rem" }} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item container xs={8} direction="column" spacing={2}>
          <Grid item></Grid>
        </Grid>
        <Grid item container xs={4} direction="column" spacing={2}>
          <WelcomeCard />
          <CommunitiesListCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
