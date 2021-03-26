/*
 * CS3099 Group A3
 */

import { LogoTemplate, ButtonLink } from "../../components";
import { PasswordResetRequestCard } from "./PasswordResetRequestCard";

export const PasswordResetRequestPage = (): JSX.Element => {
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
