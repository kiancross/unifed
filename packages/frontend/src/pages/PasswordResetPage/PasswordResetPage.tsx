/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import NonAuthenticatedTemplate from "../../components/NonAuthenticatedTemplate";
import PasswordResetCard from "./PasswordResetCard";

const PasswordResetPage = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <PasswordResetCard />
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

export default PasswordResetPage;
