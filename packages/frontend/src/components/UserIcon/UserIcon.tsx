/*
 * CS3099 Group A3
 */

import { Avatar, Typography, Theme, makeStyles, CardActionArea } from "@material-ui/core";
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Properties for the [[`UserIcon`]] component.
 */
export interface UserIconProps {
  /**
   * Username of the user.
   */
  username: string;

  /**
   * Whether the icon should be small (28px) or not (45px).
   */
  small?: boolean;

  /**
   * Whether the icon is in the header of the App.
   */
  inHeader?: boolean;
}

const useStyles = makeStyles<Theme, UserIconProps>((theme) => ({
  avatar: (props) => ({
    height: props.small ? "28px" : "45px",
    width: props.small ? "28px" : "45px",
  }),
  text: {
    color: theme.palette.text.primary,
  },
}));

/**
 * Shows the icon of a user.
 *
 * Outline:
 *
 *  - Displays the first letter of the user's username in a circle.
 *
 *  - This is used in posts to show the author's icon and in the header of the app to show the logged in user.
 *
 * @param props Properties passed to the component. See [[`UserIconProps`]].
 *
 * @internal
 */
export function UserIcon(props: UserIconProps): ReactElement {
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
}
