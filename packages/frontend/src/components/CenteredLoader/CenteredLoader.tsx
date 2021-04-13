/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { CircularProgress, CircularProgressProps, Grid } from "@material-ui/core";

export function CenteredLoader(props: CircularProgressProps): ReactElement {
  return (
    <Grid style={{ height: "100%" }} container justify="center" alignItems="center" xs={12} item>
      <CircularProgress {...props} />
    </Grid>
  );
}
