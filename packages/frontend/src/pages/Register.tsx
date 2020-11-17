/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import RegisterCard from "../components/RegisterCard";
import NonAuthenticatedTemplate from "../components/NonAuthenticatedTemplate";

const SignupForm = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <RegisterCard />
      <Button href="/login" fullWidth color="primary" variant="contained" style={{"margin-top": "16px"}}>
        Already a user? Login
      </Button>
    </NonAuthenticatedTemplate>
  );
};

export default SignupForm;
