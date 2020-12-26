/*
 * CS3099 Group A3
 */

import React from "react";
import { Button } from "@material-ui/core";
import RegisterCard from "components/RegisterCard";
import NonAuthenticatedTemplate from "components/NonAuthenticatedTemplate";
import style from "./RegistrationPage.module.scss";

const RegistrationPage = (): JSX.Element => {
  return (
    <NonAuthenticatedTemplate>
      <RegisterCard />
      <Button href="/login" fullWidth color="primary" variant="contained" className={style.button}>
        Already a user? Login
      </Button>
    </NonAuthenticatedTemplate>
  );
};

export default RegistrationPage;