/*
 * CS3099 Group A3
 */

import { Card, CardContent, Grid } from "@material-ui/core";
import { ReactElement } from "react";
import { CenteredLoader } from "..";

/**
 * Card containing a centred loader.
 *
 * @internal
 */
export function LoadingCard(): ReactElement {
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
