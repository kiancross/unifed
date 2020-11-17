import React from "react";
import logo from "./../images/unifed.svg";
import RegisterCard from "../components/RegisterCard";
import { Button, Container, Grid } from "@material-ui/core";

const SignupForm = (): JSX.Element => {
  return (
    <Container style={{ paddingTop: window.innerHeight / 4 }} maxWidth="lg">
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <img src={logo} alt="st andrews logo" width="225" height="270"></img>
        </Grid>
        <Grid item container direction="column" spacing={2} xs={5}>
          <RegisterCard />
          <Grid item>
            <Button href="/login" fullWidth color="primary" variant="contained">
              Already a user? Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupForm;
