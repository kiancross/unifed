/*
 * CS3099 Group A3
 */

import { Card, CardContent, Grid } from "@material-ui/core";
import { CenteredLoader } from "..";

export function LoadingCard() {
  return (
    <Grid item>
      <Card>
        <CardContent>
          <CenteredLoader />
        </CardContent>
      </Card>
    </Grid>
  );
}
