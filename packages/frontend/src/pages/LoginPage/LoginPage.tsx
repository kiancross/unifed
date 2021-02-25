/*
 * CS3099 Group A3
 */

import React from "react";
import LoginCard from "./LoginCard";
import { ButtonLink } from "../../components/Links";
import LogoTemplate from "../../components/LogoTemplate";
import { useMediaQuery } from "@material-ui/core";

const LoginPage = (): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 960px)");
  const direction = isMobile ? "vertical" : "horizontal";

  return (
    <LogoTemplate direction={direction}>
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
