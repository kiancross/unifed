/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { LogoTemplate, ButtonLink } from "../../components";

import { PasswordResetCard } from "./PasswordResetCard";

/**
 * Allows the user to reset their password by displaying the [[`PasswordResetCard`]] along with the Unifed logo.
 *
 * @internal
 */
export function PasswordResetPage(): ReactElement {
  return (
    <LogoTemplate>
      <PasswordResetCard />
      <ButtonLink
        to="/login"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
      >
        Return To Login
      </ButtonLink>
    </LogoTemplate>
  );
}
