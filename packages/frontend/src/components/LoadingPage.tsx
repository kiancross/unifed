/*
 * CS3099 Group A3
 */

import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

const LoadingPage = (): JSX.Element => {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingPage;
