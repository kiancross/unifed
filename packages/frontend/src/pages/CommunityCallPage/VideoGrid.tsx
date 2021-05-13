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

import { Grid, makeStyles } from "@material-ui/core";
import { ReactElement } from "react";
import { VideoWrapper, VideoWrapperProps } from "./VideoWrapper";

const useStyles = makeStyles({
  container: {
    height: "100%",
  },
});

export function VideoGrid(props: { users: VideoWrapperProps[] }): ReactElement {
  const classes = useStyles();

  return (
    <Grid container justify="space-evenly" spacing={1} className={classes.container}>
      {props.users.map((user) => {
        return (
          <Grid key={user.username} item xs={12} sm={6} md={4} lg={3}>
            <VideoWrapper {...user} />
          </Grid>
        );
      })}
    </Grid>
  );
}
