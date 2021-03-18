/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { Avatar, Typography, Theme, makeStyles } from "@material-ui/core";

interface Props {
  username: string;
  small?: boolean;
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  avatar: (props) => ({
    height: props.small ? "28px" : "45px",
    width: props.small ? "28px" : "45px",
  }),
  text: {
    color: theme.palette.text.primary,
  },
}));

const UserIcon = (props: Props): ReactElement => {
  const classes = useStyles(props);

  return (
    <Avatar alt={props.username} className={classes.avatar}>
      <Typography variant={props.small ? "body2" : "h6"} className={classes.text}>
        {props.username.charAt(0).toUpperCase()}
      </Typography>
    </Avatar>
  );
};

export default UserIcon;
