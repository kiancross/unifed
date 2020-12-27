/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import LoginCard from "./LoginCard";
import NonAuthenticatedTemplate from "components/NonAuthenticatedTemplate";
import style from "./LoginPage.module.scss";

interface LoginPageProps {
  onLogin(): void;
}

const LoginPage = (props: LoginPageProps): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <LoginCard onLogin={props.onLogin} />
      <Button
        href="/register"
        fullWidth
        color="primary"
        variant="contained"
        className={style.button}
      >
        Register an account
      </Button>
    </NonAuthenticatedTemplate>
  );
};

export default LoginPage;
