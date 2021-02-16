/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardHeader, Grid, makeStyles } from "@material-ui/core";
import UserIcon from "../../components/UserIcon";

interface Props {
  username: string;
  name: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.secondary.main,
    textAlign: "center",
  },
}));

const UserInfoCard = (props: Props): ReactElement => {
  const classes = useStyles();

  const userIcon = <UserIcon username={props.username} />;

  return (
    <Grid item>
      <Card className={classes.card}>
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
