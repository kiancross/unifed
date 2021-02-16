/*
 * CS3099 Group A3
 */

import React from "react";
import { ButtonLink } from "../../components/Links";
import LogoTemplate from "../../components/LogoTemplate";
import PasswordResetCard from "./PasswordResetCard";

const PasswordResetPage = (): JSX.Element => {
  return (
    <LogoTemplate>
      <PasswordResetCard />
      <ButtonLink
        to="/login"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
      >
        Return To Login
      </ButtonLink>
    </LogoTemplate>
  );
};

export default PasswordResetPage;
