/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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

import { Box, Container, makeStyles, Paper, Link as ExternalLink } from "@material-ui/core";
import { ReactElement } from "react";
import { Link as InternalLink } from "../Links";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(4),
  },
}));

/**
 * The footer for the [[`App`]].
 *
 * Outline:
 *
 *  - Clicking the 'Help' button takes the user to the
       [user manual](https://kiancross.github.io/unifed/).
 *
 *  - Clicking the 'Privacy Notice' button takes the user to the privacy policy.
 *
 * @internal
 */
export function Footer(): ReactElement {
  const classes = useStyles();
  return (
    <Box paddingTop="3rem">
      <Paper elevation={0} style={{ textAlign: "left", padding: "1.5rem" }}>
        <Container maxWidth="lg">
          <ExternalLink
            className={classes.link}
            href="https://kiancross.github.io/unifed/"
            target="_blank"
          >
            Help
          </ExternalLink>
          <InternalLink className={classes.link} to="/privacy-notice">
            Privacy Notice
          </InternalLink>
        </Container>
      </Paper>
    </Box>
  );
}
