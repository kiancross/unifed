/*
 * CS3099 Group A3
 */

import React from "react";
import { Card, CardActionArea, CardHeader, Grid } from "@material-ui/core";
import UserIcon from "../../components/UserIcon";
import { useTheme } from "@material-ui/core/styles";

interface userInfo {
  username: string;
  name: string;
}

const UserInfoCard = (props: userInfo): JSX.Element => {
  const theme = useTheme();
  const userIcon = <UserIcon username={props.username} />;
  return (
    <Grid item>
      <Card style={{ background: theme.palette.secondary.main, textAlign: "center" }}>
        <CardActionArea href={"/user/" + props.username}>
          <CardHeader
            data-testid="user-info-card-header"
            avatar={userIcon}
            title={props.name}
            subheader={props.username}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default UserInfoCard;
