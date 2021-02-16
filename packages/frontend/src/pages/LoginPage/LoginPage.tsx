/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import LoginCard from "./LoginCard";
import LogoTemplate from "../../components/LogoTemplate";

const LoginPage = (): JSX.Element => {
  return (
    <LogoTemplate>
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
    </LogoTemplate>
  );
};

export default LoginPage;
