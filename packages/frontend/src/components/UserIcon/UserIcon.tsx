/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Robert Mardall
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

import { Avatar, Typography, Theme, makeStyles, CardActionArea } from "@material-ui/core";
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Properties for the [[`UserIcon`]] component.
 *
 * @internal
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
