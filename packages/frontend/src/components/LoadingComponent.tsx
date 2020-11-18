import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

const LoadingComponent = (): JSX.Element => {
  return (
    <Grid container justify="center" xs={12} item>
      <CircularProgress />
    </Grid>
  );
};

export default LoadingComponent;