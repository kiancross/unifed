/*
 * CS3099 Group A3
 */

import { Avatar, Typography } from "@material-ui/core";
import React from "react";

interface userInfo {
  username: string;
  small?: boolean;
}

const UserIcon = (props: userInfo): JSX.Element => {
  const size = props.small ? "28px" : "45px";
  const test = {
    height: size,
    width: size,
    backgroundColor: "#616161",
  };

  return (
    <Avatar alt={props.username} style={test}>
      <Typography variant={props.small ? "body2" : "h6"}>
        {props.username.charAt(0).toUpperCase()}
      </Typography>
    </Avatar>
  );
};

export default UserIcon;
