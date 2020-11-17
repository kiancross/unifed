/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import ResetPasswordRequestCard from "../components/ResetPasswordRequestCard";
import NonAuthenticatedTemplate from "../components/NonAuthenticatedTemplate";

const ResetPasswordRequest = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <ResetPasswordRequestCard />
      <Button href="/login" fullWidth color="primary" variant="contained" style={{marginTop: "16px"}}>
        Return To Login
      </Button>
    </NonAuthenticatedTemplate>
  );
};

export default ResetPasswordRequest;
