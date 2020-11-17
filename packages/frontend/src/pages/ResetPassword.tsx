/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import ResetPasswordCard from "../components/ResetPasswordCard";
import NonAuthenticatedTemplate from "../components/NonAuthenticatedTemplate";

const ResetPassword = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <ResetPasswordCard />
      <Button
        href="/login"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
      >
        Return To Login
      </Button>
    </NonAuthenticatedTemplate>
  );
};

export default ResetPassword;
