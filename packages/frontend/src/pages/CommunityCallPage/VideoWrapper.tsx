/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { makeStyles, Card, CardHeader, CardMedia, IconButton, Tooltip } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import Video from "./Video";

export type VideoWrapperProps = {
  username: string;
  muted: boolean;
  stream?: MediaStream;
  self?: boolean;
  onMuteChange: () => void;
};

const useStyles = makeStyles({
  media: {
    lineHeight: 0,
  },
});

const VideoWrapper = (props: VideoWrapperProps): ReactElement => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={props.username}
        action={
          <>
            <Tooltip title={props.muted ? "Unmute" : "Mute"}>
              <IconButton aria-label="mute" onClick={() => props.onMuteChange()}>
                {props.muted ? <MicOffIcon /> : <MicIcon />}
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <CardMedia className={classes.media}>
        <Video stream={props.stream} muted={props.muted || props.self} />
      </CardMedia>
    </Card>
  );
};

export default VideoWrapper;
