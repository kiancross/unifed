/*
 * CS3099 Group A3
 */

import React from "react";
import LoginCard from "./LoginCard";
import { ButtonLink } from "../../components/Links";
import LogoTemplate from "../../components/LogoTemplate";

const LoginPage = (): JSX.Element => {
  return (
    <LogoTemplate>
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
    </LogoTemplate>
  );
};

export default LoginPage;
