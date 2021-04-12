/*
 * CS3099 Group A3
 */

import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardHeader, Grid, makeStyles } from "@material-ui/core";
import { UserIcon } from "..";
import { ReactElement } from "react";

/**
 * Properties for the [[`UserInfoCard`]] component.
 *
 * @internal
 */
export interface UserInfoCardProps {
  /**
   * Username of the user whose card is being displayed.
   */
  username: string;

  /**
   * The name of the user to be displayed.
   */
  name: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.secondary.main,
    textAlign: "center",
  },
}));

/**
 * Displays the user's username, name and user icon in a card.
 *
 * @param props Properties passed to the component. See [[`UserInfoCardProps`]].
 *
 * @internal
 */
export function UserInfoCard(props: UserInfoCardProps): ReactElement {
  const classes = useStyles();

  const userIcon = <UserIcon inHeader username={props.username} />;

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardActionArea to={"/user/" + props.username} component={RouterLink}>
          <CardHeader avatar={userIcon} title={props.name} subheader={props.username} />
        </CardActionArea>
      </Card>
    </Grid>
  );
}
