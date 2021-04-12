/*
 * CS3099 Group A3
 */

import { Container, Grid, useMediaQuery } from "@material-ui/core";

import { WelcomeCard } from "./WelcomeCard";
import { CommunitiesListCard } from "./CommunitiesListCard";
import { SubscribedPosts } from "./SubscribedPosts";
import { ReactElement } from "react";

/**
 * The user's home page.
 *
 * Outline:
 *
 *  - Shows posts from the communities that the user is subscribed to.
 *
 *  - Shows a list of communities on the user's server.
 *
 * @internal
 */
export function HomePage(): ReactElement {
  const isMobile = useMediaQuery("(max-width: 960px)");
  const direction = isMobile ? "column-reverse" : "row";
  return (
    <Container style={{ paddingTop: "1rem" }} maxWidth="lg">
      <Grid container direction={direction} spacing={3}>
        <Grid item container xs={12} md={8} direction="column" spacing={2}>
          <SubscribedPosts />
        </Grid>
        <Grid item container xs={12} md={4} direction="column" spacing={2}>
          <WelcomeCard />
          <CommunitiesListCard />
        </Grid>
      </Grid>
    </Container>
  );
}
