/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { makeStyles, Card, CardHeader, CardMedia, IconButton, Tooltip } from "@material-ui/core";
import { Mic as MicIcon, MicOff as MicOffIcon, CallEnd as CallEndIcon } from "@material-ui/icons";

import { Video } from "./Video";

export type VideoWrapperProps = {
  username: string;
  muted: boolean;
  stream?: MediaStream;
  self?: boolean;
  onMuteChange: () => void;
  onLeaveCall?: () => void;
};

const useStyles = makeStyles({
  media: {
    lineHeight: 0,
  },
});

export const VideoWrapper = (props: VideoWrapperProps): ReactElement => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={props.username}
        action={
          <>
            {props.self ? (
              <Tooltip title="Leave Call">
                <IconButton
                  aria-label="leave"
                  onClick={() => {
                    if (props.onLeaveCall) {
                      props.onLeaveCall();
                    }
                  }}
                >
                  <CallEndIcon />
                </IconButton>
              </Tooltip>
            ) : null}
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
