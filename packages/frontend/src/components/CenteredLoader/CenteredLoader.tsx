/*
 * CS3099 Group A3
 */

import { CircularProgress, Grid } from "@material-ui/core";
import { ReactElement } from "react";

/**
 * The loading spinner used when data is being retrieved e.g. during a GraphQL call.
 *
 * @internal
 */
export function CenteredLoader(): ReactElement {
  return (
    <Grid style={{ height: "100%" }} container justify="center" alignItems="center" xs={12} item>
      <CircularProgress />
    </Grid>
  );
}
