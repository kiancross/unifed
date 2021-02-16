/*
 * CS3099 Group A3
 */

import React from "react";
import LoginCard from "./LoginCard";
import { ButtonLink } from "../../components/Links";
import NonAuthenticatedTemplate from "../../components/NonAuthenticatedTemplate";

const LoginPage = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <LoginCard />
      <ButtonLink
        to="/register"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
      >
        Register an account
      </ButtonLink>
    </NonAuthenticatedTemplate>
  );
};

export default LoginPage;
