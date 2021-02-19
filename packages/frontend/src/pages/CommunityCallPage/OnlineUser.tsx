/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Theme, makeStyles, Card, CardContent, IconButton, Typography } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideoCamIcon from "@material-ui/icons/Videocam";
import VideoCamOffIcon from "@material-ui/icons/VideocamOff";

interface Props {
  username: string;
  muted?: boolean;
  hidden?: boolean;
  noMedia?: boolean;
  onMuteChange: () => void;
  onHiddenChange: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "60px",
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: "1 0 auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const OnlineUser = (props: Props): ReactElement => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {props.username}
          </Typography>
          {props.noMedia ? (
            <Typography variant="subtitle1" color="textSecondary">
              {props.username}
            </Typography>
          ) : null}
        </CardContent>
        <div className={classes.controls}>
          <IconButton
            aria-label="hide"
            onClick={props.onMuteChange}
            disabled={props.hidden || props.noMedia}
          >
            {props.muted ? <MicOffIcon /> : <MicIcon />}
          </IconButton>
          <IconButton aria-label="mute" onClick={props.onHiddenChange} disabled={props.noMedia}>
            {props.hidden ? <VideoCamOffIcon /> : <VideoCamIcon />}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default OnlineUser;
