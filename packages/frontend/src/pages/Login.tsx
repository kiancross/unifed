import React from "react";
import logo from "./../images/st-andrews-logo.png";
import LoginCard from "../components/LoginCard";
import { Button, Container, Grid } from "@material-ui/core";

const LoginForm = (): JSX.Element => {
  return (
    <Container style={{ paddingTop: window.innerHeight / 4 }} maxWidth="lg">
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <img src={logo} alt="st andrews logo" width="225" height="270"></img>
        </Grid>
        <Grid item container direction="column" spacing={2} xs={5}>
          <LoginCard />
          <Grid item>
            <Button href="/register" fullWidth color="primary" variant="contained">
              Register an account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
