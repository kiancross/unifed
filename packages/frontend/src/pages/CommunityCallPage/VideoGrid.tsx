/*
 * CS3099 Group A3
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
