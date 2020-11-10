import { Avatar, Typography } from "@material-ui/core";
import React from "react";

interface userInfo {
  username: string;
  small?: boolean;
}

const UserIcon = (props: userInfo): JSX.Element => {
  const smallSize = "30px";
  const smallStyle = {
    height: smallSize,
    width: smallSize,
  };
  return (
    <Avatar alt={props.username} style={props.small ? smallStyle : {}}>
      <Typography variant={props.small ? "body2" : "h6"}>
        {props.username.charAt(0).toUpperCase()}
      </Typography>
    </Avatar>
  );
};

export default UserIcon;
