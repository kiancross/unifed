/*
 * Copyright (C) 2021 Allan Mathew Chacko
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Kian Cross
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
    <Container style={{ paddingTop: "1.5rem" }} maxWidth="lg">
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
