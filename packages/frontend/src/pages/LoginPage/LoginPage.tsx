/*
 * CS3099 Group A3
 */

import { useMediaQuery } from "@material-ui/core";
import { ReactElement } from "react";

import { LogoTemplate, ButtonLink } from "../../components";
import { LoginCard } from "./LoginCard";

export function LoginPage(): ReactElement {
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
}
