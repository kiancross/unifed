/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { LogoTemplate, ButtonLink } from "../../components";

import { PasswordResetCard } from "./PasswordResetCard";

export const PasswordResetPage = (): ReactElement => {
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
};
