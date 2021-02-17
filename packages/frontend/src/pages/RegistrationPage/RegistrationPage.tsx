/*
 * CS3099 Group A3
 */

import React from "react";
import { ButtonLink } from "../../components/Links";
import LogoTemplate from "../../components/LogoTemplate";
import RegistrationCard from "./RegistrationCard";

const RegistrationPage = (): JSX.Element => {
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

export default RegistrationPage;
