/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { LogoTemplate, ButtonLink } from "../../components";
import { PasswordResetRequestCard } from "./PasswordResetRequestCard";

/**
 * Allows a user to request a reset password token by displaying the [[`PasswordResetRequestCard`]] or to return to the [[`LoginPage`]]..
 *
 * @internal
 */
export function PasswordResetRequestPage(): ReactElement {
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
}
