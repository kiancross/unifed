/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import LoginCard from "./LoginCard";
import NonAuthenticatedTemplate from "../../components/NonAuthenticatedTemplate";

const LoginPage = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <LoginCard />
      <Button
        href="/register"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
      >
        Register an account
      </Button>
    </NonAuthenticatedTemplate>
  );
};

export default LoginPage;
