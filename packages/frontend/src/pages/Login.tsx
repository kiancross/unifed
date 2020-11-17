/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import LoginCard from "../components/LoginCard";
import NonAuthenticatedTemplate from "../components/NonAuthenticatedTemplate";

const LoginForm = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <LoginCard />
      <Button href="/register" fullWidth color="primary" variant="contained" style={{"margin-top": "16px"}}>
        Register an account
      </Button>
    </NonAuthenticatedTemplate>
  );
};

export default LoginForm;
