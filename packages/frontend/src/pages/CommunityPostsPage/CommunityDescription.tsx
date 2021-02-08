/*
 * CS3099 Group A3
 */

import React from "react";
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

interface Props {
  desc: string;
}

const CommunityDescription = (props: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <Grid item>
      <Card style={{ background: theme.palette.secondary.main }}>
        <CardHeader subheader="About" />
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
