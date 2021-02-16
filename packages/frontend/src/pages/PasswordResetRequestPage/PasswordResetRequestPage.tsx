/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import LogoTemplate from "../../components/LogoTemplate";
import PasswordResetRequestCard from "./PasswordResetRequestCard";

const PasswordResetRequestPage = (): JSX.Element => {
  return (
    <LogoTemplate>
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
    </LogoTemplate>
  );
};

export default PasswordResetRequestPage;
