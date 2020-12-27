/*
 * CS3099 Group A3
 */

import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

const CenteredLoader = (): JSX.Element => {
  return (
    <Grid container justify="center" xs={12} item>
      <CircularProgress />
    </Grid>
  );
};

export default CenteredLoader;
