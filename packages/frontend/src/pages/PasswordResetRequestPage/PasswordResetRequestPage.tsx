/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import NonAuthenticatedTemplate from "components/NonAuthenticatedTemplate";
import PasswordResetRequestCard from "./PasswordResetRequestCard";

const PasswordResetRequestPage = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <PasswordResetRequestCard />
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

export default PasswordResetRequestPage;
