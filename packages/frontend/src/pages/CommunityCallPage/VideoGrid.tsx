/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import VideoWrapper, { VideoWrapperProps } from "./VideoWrapper";

type VideoGridProps = {
  users: Omit<VideoWrapperProps, "onMuteChange" | "onHiddenChange">[];
  onMuteChange: (current: boolean, user: string) => void;
};

const useStyles = makeStyles({
  container: {
    height: "100%",
  },
});

const VideoGrid = (props: VideoGridProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container justify="space-evenly" spacing={1} className={classes.container}>
      {props.users.map((user) => {
        return (
          <Grid key={user.username} item xs={12} sm={6} md={4} lg={3}>
            <VideoWrapper
              username={user.username}
              muted={user.muted}
              stream={user.stream}
              onMuteChange={() => {
                props.onMuteChange(user.muted, user.username);
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default VideoGrid;
