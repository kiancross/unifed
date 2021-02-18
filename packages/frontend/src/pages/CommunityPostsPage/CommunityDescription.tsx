/*
 * CS3099 Group A3
 */

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

interface Props {
  desc: string;
  title: string;
  server: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.secondary.main,
  },
}));

const CommunityDescription = (props: Props): JSX.Element => {
  const classes = useStyles();

  const title = <Typography variant="h6">{props.title}</Typography>;

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardHeader disableTypography title={title} subheader={props.server} />
        <Divider />
        <Grid container>
          <CardContent>
            <Typography variant="body2">{props.desc}</Typography>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CommunityDescription;
