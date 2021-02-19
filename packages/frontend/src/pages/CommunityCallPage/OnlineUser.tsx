/*
 * CS3099 Group A3
 */

import React, { ReactElement, useState } from "react";
import { Theme, makeStyles, Card, CardContent, IconButton, Typography } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideoCamIcon from "@material-ui/icons/Videocam";
import VideoCamOffIcon from "@material-ui/icons/VideocamOff";

interface Props {
  username: string;
  muted?: boolean;
  hidden?: boolean;
  onMuteChange: (muted: boolean) => void;
  onHiddenChange: (hidden: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "80px",
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

  const [muted, setMuted] = useState(!!props.muted);
  const [hidden, setHidden] = useState(!!props.hidden);

  const toggleMuted = () => {
    props.onMuteChange(!muted);
    setMuted(!muted);
  };

  const toggleHidden = () => {
    props.onHiddenChange(!hidden);
    setHidden(!hidden);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            Full Name
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.username}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="hide" onClick={toggleMuted} disabled={props.muted !== undefined}>
            {muted ? <MicOffIcon /> : <MicIcon />}
          </IconButton>
          <IconButton
            aria-label="mute"
            onClick={toggleHidden}
            disabled={props.hidden !== undefined}
          >
            {hidden ? <VideoCamOffIcon /> : <VideoCamIcon />}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default OnlineUser;
