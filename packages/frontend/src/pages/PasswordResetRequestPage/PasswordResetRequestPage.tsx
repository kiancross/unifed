/*
 * CS3099 Group A3
 */

import React from "react";
import { ButtonLink } from "../../components/Links";
import NonAuthenticatedTemplate from "../../components/NonAuthenticatedTemplate";
import PasswordResetRequestCard from "./PasswordResetRequestCard";

const PasswordResetRequestPage = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <PasswordResetRequestCard />
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

export default PasswordResetRequestPage;
