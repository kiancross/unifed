/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Lewis Mazzei
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

import {
  Button,
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { ReactElement } from "react";

const useStyles = makeStyles({
  fullHeight: {
    height: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  instructions: {
    textAlign: "center",
  },
});

export function JoinCallMessage(props: { onJoinClick: () => void }): ReactElement {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.fullHeight}
    >
      <Grid item container className={classes.fullHeight} justify="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.fullWidth}>
            <CardContent>
              <Typography variant="body1" className={classes.instructions}>
                Clicking the 'Join Community Call' button will prompt you to allow Unifed to access
                your microphone and camera. We need this to let you chat with other people in the
                community! If you say 'No', you will still be able to hear and see other users, but
                they will not be able to hear or see you.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={props.onJoinClick}
                className={classes.fullWidth}
                aria-label="join community call"
              >
                Join Community Call
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
