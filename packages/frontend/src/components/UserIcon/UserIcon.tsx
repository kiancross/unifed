/*
 * CS3099 Group A3
 */

import { Avatar, Typography, useTheme } from "@material-ui/core";
import React from "react";

interface userInfo {
  username: string;
  small?: boolean;
}

const UserIcon = (props: userInfo): JSX.Element => {
  const theme = useTheme().palette;
  const smallSize = "28px";
  const smallStyle = {
    height: smallSize,
    width: smallSize,
  };
  return (
    <Avatar alt={props.username} style={props.small ? smallStyle : {}}>
      <Typography variant={props.small ? "body2" : "h6"} style={{ color: theme.text.primary }}>
        {props.username.charAt(0).toUpperCase()}
      </Typography>
    </Avatar>
  );
};

export default UserIcon;
