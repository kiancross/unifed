/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import LoginCard from "../components/LoginCard";
import NonAuthenticatedTemplate from "../components/NonAuthenticatedTemplate";

interface LoginProps {
  onLogin(): void;
}

const LoginForm = (props: LoginProps): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <LoginCard onLogin={props.onLogin} />
      <Button href="/register" fullWidth color="primary" variant="contained" style={{marginTop: "16px"}}>
        Register an account
      </Button>
    </NonAuthenticatedTemplate>
  );
};

export default LoginForm;
