/*
 * CS3099 Group A3
 */

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardHeader, Grid } from "@material-ui/core";
import UserIcon from "../../components/UserIcon";

interface userInfo {
  username: string;
  name: string;
}

const UserInfoCard = (props: userInfo): JSX.Element => {
  const userIcon = <UserIcon username={props.username} />;
  return (
    <Grid item>
      <Card style={{ textAlign: "center" }}>
        <CardActionArea to={"/user/" + props.username} component={RouterLink}>
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
