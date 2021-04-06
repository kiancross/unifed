/*
 * CS3099 Group A3
 */

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  makeStyles,
  CardActions,
} from "@material-ui/core";
import { ReactElement } from "react";
import { Link } from "../../components";

import { SubscribeButton } from "./SubscribeButton";

export interface CommunityDescriptionProps {
  desc: string;
  title: string;
  id: string;
  server: string;
  isSubscribed: boolean;
  admins: string[];
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.secondary.main,
  },
}));

export function CommunityDescription(props: CommunityDescriptionProps): ReactElement {
  const classes = useStyles();

  const title = <Typography variant="h6">{props.title}</Typography>;

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardHeader disableTypography title={title} subheader={props.server} />
        <CardActions>
          <SubscribeButton id={props.id} server={props.server} isSubscribed={props.isSubscribed} />
        </CardActions>
        <Divider />
        <Grid container>
          <CardContent>
            <Typography variant="h6">Description</Typography>
            {props.desc}
          </CardContent>
        </Grid>
        <Divider />
        <Grid container>
          <CardContent>
            <Typography variant="h6">Admins</Typography>
            {props.admins.map((adminID, index) => (
              <Typography variant="body2" key={index}>
                <Link to={"/user/" + adminID} color="inherit">
                  {adminID}
                </Link>
              </Typography>
            ))}
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
}
