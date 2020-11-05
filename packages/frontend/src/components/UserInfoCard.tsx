import React from "react";
import { Button, Card, CardActions, CardHeader, Divider, Grid } from "@material-ui/core";
import UserIcon from "./UserIcon";

interface userInfo {
  username: string;
  name: string;
}

const UserInfoCard = (props: userInfo): JSX.Element => {
  const userIcon = <UserIcon username={props.username} />;
  return (
    <Grid item>
      <Card>
        <CardHeader avatar={userIcon} title={props.name} subheader={props.username} />
        <Divider />
        <Grid container justify="center">
          <CardActions>
            <Button size="small" disabled>
              Follow
            </Button>
            <Button size="small" disabled>
              Message
            </Button>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
};

export default UserInfoCard;
