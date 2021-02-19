/*
 * CS3099 Group A3
 */

import { Card, CardContent, Grid } from "@material-ui/core";
import CenteredLoader from "../CenteredLoader";
import React from "react";

const LoadingCard = () => {
  return (
    <Grid item>
      <Card>
        <CardContent>
          <CenteredLoader />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LoadingCard;
