/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { LogoTemplate, ButtonLink } from "../../components";
import { PasswordResetRequestCard } from "./PasswordResetRequestCard";

export const PasswordResetRequestPage = (): ReactElement => {
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
