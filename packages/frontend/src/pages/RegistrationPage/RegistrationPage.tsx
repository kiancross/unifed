/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { LogoTemplate, ButtonLink } from "../../components";
import { RegistrationCard } from "./RegistrationCard";

/**
 * Allows someone to register for the app.
 *
 * Outline:
 *
 *  - Displays the logo of the app.
 *
 *  - Displays the [[`RegistrationCard`]].
 *
 *  - Allows the user to login if they already have an account by clicking the 'Already a user? Login' button.
 *
 * @internal
 */
export function RegistrationPage(): ReactElement {
  return (
    <LogoTemplate>
      <RegistrationCard />
      <ButtonLink
        to="/login"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
      >
        Already a user? Login
      </ButtonLink>
    </LogoTemplate>
  );
}
