/*
 * CS3099 Group A3
 */

import { CircularProgress, Grid } from "@material-ui/core";

export const CenteredLoader = (): JSX.Element => {
  return (
    <Grid style={{ height: "100%" }} container justify="center" alignItems="center" xs={12} item>
      <CircularProgress />
    </Grid>
  );
};
