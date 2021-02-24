/*
 * CS3099 Group A3
 */

import React from "react";
import { ButtonLink } from "../../components/Links";
import LogoTemplate from "../../components/LogoTemplate";
import PasswordResetRequestCard from "./PasswordResetRequestCard";

const PasswordResetRequestPage = (): JSX.Element => {
  return (
    <LogoTemplate>
      <PasswordResetRequestCard />
      <ButtonLink
        to="/login"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
        data-testid="login-return-button"
      >
        Return To Login
      </ButtonLink>
    </LogoTemplate>
  );
};

export default PasswordResetRequestPage;
