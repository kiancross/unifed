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
import { ButtonLink } from "..";

/**
 * Properties for the [[`ErrorMessage`]] component.
 *
 * @internal
 */
export interface ErrorMessageProps {
  /**
   * Error message to be displayed.
   */
  message: string;
}

const useStyles = makeStyles({
  container: {
    paddingTop: "10rem",
    textAlign: "center",
  },
});

/**
 * An formatted error message to be displayed to the user.
 *
 * Outline:
 *
 *  - Displays a message to the user indicating the problem.
 *
 *  - Provides a 'Return Home' button, taking the user to their home page when clicked.
 *
 * @param props Properties passed to the component. See [[`ErrorMessageProps`]].
 *
 * @internal
 */
export function ErrorMessage(props: ErrorMessageProps): ReactElement {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h6" gutterBottom>
        {props.message}
      </Typography>
      <ButtonLink color="primary" variant="contained" to="/">
        Return Home
      </ButtonLink>
    </Container>
  );
}
