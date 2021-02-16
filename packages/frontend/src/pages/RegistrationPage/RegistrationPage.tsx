/*
 * CS3099 Group A3
 */

import React from "react";
import { ButtonLink } from "../../components/Links";
import NonAuthenticatedTemplate from "../../components/NonAuthenticatedTemplate";
import RegistrationCard from "./RegistrationCard";

const RegistrationPage = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
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
    </NonAuthenticatedTemplate>
  );
};

export default RegistrationPage;
