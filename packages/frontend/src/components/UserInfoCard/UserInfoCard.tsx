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
