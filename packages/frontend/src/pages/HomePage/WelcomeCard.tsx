/*
 * CS3099 Group A3
 */

import React from "react";
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@material-ui/core";

const WelcomeCard = () => {
  const content = "Your Unifed homepage.";
  return (
    <Grid item>
      <Card>
        <CardHeader subheader="Homepage" />
        <Divider />
        <Grid container>
          <CardContent>
            <Typography variant="body2">{content}</Typography>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default WelcomeCard;
