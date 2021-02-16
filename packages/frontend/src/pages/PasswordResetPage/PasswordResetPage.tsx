/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import LogoTemplate from "../../components/LogoTemplate";
import PasswordResetCard from "./PasswordResetCard";

const PasswordResetPage = (): JSX.Element => {
  return (
    <LogoTemplate>
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
    </LogoTemplate>
  );
};

export default PasswordResetPage;
