/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Lewis Mazzei
 * Copyright (C) 2020 Robert Mardall
 * Copyright (C) 2020 Allan Mathew Chacko
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

import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactElement } from "react";

import { ButtonLink } from "../../components/Links";

const useStyles = makeStyles({
  container: {
    paddingTop: "10rem",
    textAlign: "center",
  },
});

/**
 * Displays a '404 Page not Found' message if an invalid URL is entered.
 *
 * A [[`ButtonLink`]] is diplayed for the user to return home.
 *
 * @internal
 */
export function PageNotFoundPage(): ReactElement {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h6" gutterBottom>
        404 Page Not Found
      </Typography>
      <ButtonLink color="primary" variant="contained" to="/">
        Return Home
      </ButtonLink>
    </Container>
  );
}
