/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import NonAuthenticatedTemplate from "../../components/NonAuthenticatedTemplate";
import RegistrationCard from "./RegistrationCard";

const RegistrationPage = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <RegistrationCard />
      <Button
        href="/login"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
      >
        Already a user? Login
      </Button>
    </NonAuthenticatedTemplate>
  );
};

export default RegistrationPage;
