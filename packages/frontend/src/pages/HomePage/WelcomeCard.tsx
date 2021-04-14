/*
 * CS3099 Group A3
 */

import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@material-ui/core";
import { ReactElement } from "react";

/**
 * Displays a welcome card to the user on their [[`HomePage`]].
 *
 * @internal
 */
export function WelcomeCard(): ReactElement {
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
}
