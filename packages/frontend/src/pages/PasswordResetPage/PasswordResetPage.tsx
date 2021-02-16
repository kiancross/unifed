/*
 * CS3099 Group A3
 */

import React from "react";
import { ButtonLink } from "../../components/Links";
import NonAuthenticatedTemplate from "../../components/NonAuthenticatedTemplate";
import PasswordResetCard from "./PasswordResetCard";

const PasswordResetPage = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
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
    </NonAuthenticatedTemplate>
  );
};

export default PasswordResetPage;
