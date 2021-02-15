/*
 * CS3099 Group A3
 */

import React, { ReactElement, ReactNode } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/unifed.svg";

interface Props {
  children: ReactNode;
}

const useStyles = makeStyles({
  container: {
    height: "100%",
  },
  logo: {
    width: "100%",
  },
  logoText: {
    color: "#3f3f40",
    fontFamily: "'Roboto Mono', monospace",
    fontSize: "4em",
    textAlign: "center",
  },
});

const NonAuthenticatedTemplate = (prop: Props): ReactElement => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.container}
      >
        <Grid container spacing={10} justify="space-evenly">
          <Grid item container xs={4} direction="column" justify="center">
            <div>
              <img src={logo} alt="Unifed" className={classes.logo}></img>
              <div className={classes.logoText}>Unifed</div>
            </div>
          </Grid>
          <Grid item container xs={6} direction="column" justify="center">
            {prop.children}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NonAuthenticatedTemplate;
