/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { Avatar, Typography, Theme, makeStyles, CardActionArea } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  username: string;
  small?: boolean;
  inHeader?: boolean;
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

export const UserIcon = (props: Props): ReactElement => {
  const classes = useStyles(props);

  const avatar = (
    <Avatar alt={props.username} className={classes.avatar}>
      <Typography variant={props.small ? "body2" : "h6"} className={classes.text}>
        {props.username.charAt(0).toUpperCase()}
      </Typography>
    </Avatar>
  );

  return props.inHeader ? (
    avatar
  ) : (
    <CardActionArea to={"/user/" + props.username} component={RouterLink}>
      {avatar}
    </CardActionArea>
  );
};
