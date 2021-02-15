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
  const size = props.small ? "28px" : "45px";
  const style = {
    height: size,
    width: size,
    backgroundColor: "#616161",
  };

  return (
    <Avatar alt={props.username} style={style}>
      <Typography variant={props.small ? "body2" : "h6"} style={{ color: theme.text.primary }}>
        {props.username.charAt(0).toUpperCase()}
      </Typography>
    </Avatar>
  );
};

export default UserIcon;
