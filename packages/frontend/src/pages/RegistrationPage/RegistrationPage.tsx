/*
 * CS3099 Group A3
 */

import { LogoTemplate, ButtonLink } from "../../components";
import { RegistrationCard } from "./RegistrationCard";

export const RegistrationPage = (): JSX.Element => {
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
};
